<?php

namespace App\Http\Middleware;

use App\ConstParam\ErrorConst;
use App\Models\System\SysDictData;
use App\Models\System\SysRoleApi;
use App\Models\System\SysUserRole;
use App\Utils\CommonUtil;
use Closure;
use Illuminate\Http\Request;

class AuthWebToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $g = null)
    {
        // 身份校验
        if (!app('jwtAuth')->check()) {
            return response()->json(['code' => 401,'msg' => 'token校验失败']);
        }
        // 接口权限校验
        // self::checkApiAuth($request);
        return $next($request);
    }

    // 查询该用户的角色是否有权限访问该接口
    private static function checkApiAuth(Request $request) {
        $user = app('jwtAuth')->userInfo();
        // 管理员拥有所有权限
        if($user['id'] == 1) {
            return;
        }
        $userRoles = SysUserRole::where('user_id', '=', $user['id'])->get()->toArray();
        $roleIds = array_column($userRoles, 'role_id');
        // 查询角色对应的api
        $roleApis = SysRoleApi::with('sysApi')
        ->whereIn('role_id', $roleIds)
        ->get()
        ->toArray();
        $apis = array_column($roleApis, 'sys_api');
        // 过滤出接口
        $apis = array_filter($apis, function($item){
            return $item['type'] == 1;
        });
        // 检测当前路由是否在可访问队列里
        $flag = false; // false未匹配到
        $currentMethod = $request->method();
        // 查询字典
        $sysApiQueryType = SysDictData::where('dict_type', '=', 'sys_api_query_type')->get()->toArray();
        foreach ($apis as $api) {
            $path = $api['path'];
            $apiType = $api['api_type'];
            // 转换为文字
            foreach ($sysApiQueryType as $type) {
                if($type['dict_value'] == $apiType) {
                    $apiType = $type['dict_label'];
                    break;
                }
            }
            if(strtoupper($currentMethod) == strtoupper($apiType) && $request->is('api/v1/' . $path))
            {
                $flag = true;
                break;
            }
        }
        if(!$flag) {
            CommonUtil::throwException(ErrorConst::UNAUTHORIZED_ACCESS_CODE, ErrorConst::UNAUTHORIZED_ACCESS_CODE_MSG, 403);
        }
    }
}
