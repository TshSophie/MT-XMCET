<?php

namespace App\Services\Common;

use App\ConstParam\ErrorConst;
use App\Models\App\AppUser;
use App\Utils\CommonUtil;
use App\Utils\StringUtils;
use Illuminate\Support\Facades\Redis;

class WxTokenService {
    protected $code;
    protected $wxAppID;
    protected $wxAppSecret;
    protected $wxLoginUrl;

    public function __construct($code)
    {
        $this->code = $code;
        $this->wxAppID = config('wx.app_id');
        $this->wxAppSecret = config('wx.app_secret');
        $this->wxLoginUrl = sprintf(config('wx.login_url'),
        $this->wxAppID, $this->wxAppSecret, $this->code);
    }

    /**
     * 向微信发送请求获取openid并生成token返回
     * @return string token令牌
     * @throws Exception
     */
    public function get()
    {
        // 向微信发送请求
        $result = curl_get($this->wxLoginUrl);
        // 将返回结果转成数组
        $wxResult = json_decode($result, true);
        // 如果请求结果为空则抛出服务器异常
        if (empty($wxResult)) {
            CommonUtil::throwException(ErrorConst::WX_INNER_ERR_MSG, ErrorConst::WX_INNER_ERR_CODE);
        } else {
            //微信请求 结果为失败抛出异常
            $loginFail = array_key_exists('errcode', $wxResult);
            if ($loginFail) {
                //处理异常错误
                $this->processLoginError($wxResult);
            } else {
                //成功返回token
                return $this->grantToken($wxResult);
            }
        }
        return null;
    }

    /**
     * 生成令牌
     * @return string 返回生成的令牌
     */
    public static function generateToken()
    {
        // 32个字符组成一组随机字符串
        $randChars = StringUtils::getRandChars(32);
        // 用三组字符串，进行MD5加密
        $timestamp = $_SERVER['REQUEST_TIME'];
        // salt加盐加密
        $salt = config('app.key');
        return md5($randChars . $timestamp . $salt);
    }
    
    /**
     * 获取当前用户的uid
     * @return mixed
     */
    public static function getCurrentUid()
    {
        return self::getCurrentTokenVar('uid');
    }

    /**
     * 从缓存中获取指定字段的值
     * @param $token
     * @param $key
     * @return mixed
     * @throws Exception
     * @throws TokenException
     */
    public static function getCurrentTokenVar($key)
    {
        //根据token获取缓存信息
        $vars = Redis::get(self::getTokenFromRequest());
        if (!$vars) {
            CommonUtil::throwException(ErrorConst::TOKEN_EXPIRE_MSG, ErrorConst::TOKEN_EXPIRE_CODE);
        } else {
            // 如果缓存信息不是json格式则转成数组格式
            if (!is_array($vars)) {
                $vars = json_decode($vars, true);
            }
            // 检查缓存中是否存在$key这个键，存在则取出并返回
            if (array_key_exists($key, $vars)) {
                return $vars[$key];
            } else {
                CommonUtil::throwException(ErrorConst::TOKEN_EXPIRE_MSG, ErrorConst::TOKEN_EXPIRE_CODE);
            }
        }
    }

    private static function getTokenFromRequest() {
        return request()->header('token') ?? request()->input('token');
    }

    /**
     * 根据微信返回的信息获取token
     * @param $wxResult
     * @return string
     */
    private function grantToken($wxResult)
    {
        //拿到openid
        //查询数据库这个openid是否已经存在
        //如果存在，则不处理，否则新增一条user记录
        //生成令牌，准备缓存数据，写入缓存
        //把令牌返回到客户端去
        //key:令牌
        //value：wxResult, uid权限
        $openid = $wxResult['openid'];
        //获取openid对应用户信息
        $user = AppUser::getByOpenid($openid);
        // 标记用户是否授权过信息
        $flagUserAuthorized = false;
        //若存在该用户则取出uid
        if ($user) {
            $uid = $user->id;
            if($user->avatar == '' || $user->nick_name == '') {
                $flagUserAuthorized = false;
            } else {
                $flagUserAuthorized = true;
            }
        } // 否则新增一个用户并将uid传过来,并抛出未授权的异常
        else {
            $flagUserAuthorized = false;
            $uid = AppUser::newUserByOpenid($openid);
        }
        // 预处理缓存值
        $cachedValue = $this->prepareCachedValue($wxResult, $uid);
        // 将处理好的信息存入缓存并返回token
        $token = $this->saveToCache($cachedValue);
        return [
            'token' => $token,
            'authorized' => $flagUserAuthorized
        ];
    }

    /**
     * 缓存用户信息并返回生成的token
     * @param $cachedValue string 需要缓存的信息
     * @return string token令牌
     * @throws ThrowException
     */
    private function saveToCache($cachedValue)
    {
        // 生成token
        $key = self::generateToken();
        $value = json_encode($cachedValue);
        $expire_in = config('wx.token_expire_in');
        // 缓存
        $request = Redis::setex($key, $expire_in, $value);
        if (!$request) {
            CommonUtil::throwException(ErrorConst::SERVER_EXCEPTION_MSG, ErrorConst::SERVER_EXCEPTION_CODE);
        }
        // 返回令牌
        return $key;
    }

    /**
     * 预处理缓存信息并将其返回
     * @param $wxResult string 微信返回的结果
     * @param $uid  int 用户id
     * @return mixed 返回处理后的信息
     */
    private function prepareCachedValue($wxResult, $uid)
    {
        $cachedValue = $wxResult;
        $cachedValue['uid'] = $uid;
        return $cachedValue;
    }

    /**
     * 对微信返回的错误信息进行处理
     * @param $wxResult
     * @throws ThrowException
     */
    private function processLoginError($wxResult)
    {
        CommonUtil::throwException($wxResult['errmsg'], $wxResult['errcode']);
    }

}