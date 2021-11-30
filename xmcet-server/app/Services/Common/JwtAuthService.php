<?php
namespace App\Services\Common;

use App\ConstParam\Constants;
use App\ConstParam\ErrorConst;
use App\Models\System\SysUser;
use App\Utils\AddressUtils;
use App\Utils\CommonUtil;
use App\Utils\StringUtils;
use Illuminate\Support\Facades\Redis;
use Browser;

/**
 * 处理令牌生成、校验
 */
class JwtAuthService {

    // key前缀
    // private $key_pre = 'login_token:';

    // token 在header中的键名
    private $tokenField = 'Authorization';

    private $userFieldName = 'user_name';

    private const SECRET = 'd3323fgfs12345';

    public function __construction(){
    }

    /**
     * 获取token
     */
    public function createToken($username, $password)
    {
        $user = SysUser::with('dept')->where([
            $this->userFieldName => $username,
        ])->first();
        if($user) {
            if(\Hash::check($password, $user['password'])){
                $data = $user->toArray();
                $data['dept_name'] = $data['dept']['dept_name'];
                unset($data['dept']);
                return [
                    'name' => $user[$this->userFieldName],
                    'token' => $this->genarateToken($data)
                ];
            }
        }
        CommonUtil::throwException(ErrorConst::LOGIN_FAILED_CODE, ErrorConst::LOGIN_FAILED_CODE_MSG);
    }

    /**
     * 校验token
     */
    public function check()
    {
        $token = $this->getTokenFromRequest();
        return Redis::exists($this->sessionId($token));
    }

    /**
     * 退出登录
     */
    public function logout()
    {
        $token = $this->getTokenFromRequest();
        return Redis::del($this->sessionId($token));
    }

    /**
     * 获取当前用户信息
     */
    public function userInfo()
    {           
        $token = $this->getTokenFromRequest();
        // 查询缓存
        $data = Redis::get($this->sessionId($token));
        return json_decode($data, true);
    }

    private function getTokenFromRequest() {
        return request()->header($this->tokenField) ?? request()->input($this->tokenField);
    }

    /**
     * 生成token
     */
    private function genarateToken($data)
    {
        $randChars = StringUtils::getRandChars(32);
        $timestamp = $_SERVER['REQUEST_TIME'];
        $salt = config('app.key');
        $u_token = md5($randChars.$timestamp.$salt);
        $request = app('request');
        $logInfo = [
            'ipaddr' => $request->ip(),
            'loginLocation' => AddressUtils::getRealAddressByIP($request->ip()),
            'browser' => Browser::browserName(),
            'os' => Browser::platformName(),
            'loginTime' => date('Y-m-d H:i:s', time()),
            'tokenId' => $this->sessionId($u_token)
        ];
        // 缓存 token -> userInfo
        $this->cacheToken($u_token, array_merge($data, $logInfo));
        return $u_token;
    }

    /**
     * token对应的sessionId
     */
    private function sessionId($token) {
        return Constants::LOGIN_TOKEN_KEY.md5($token . self::SECRET);
    }

    /**
     * 缓存token
     */
    private function cacheToken(String $token, Array $data)
    {
        Redis::setex($this->sessionId($token), config('app.token_expire'), json_encode($data));
    }   
}