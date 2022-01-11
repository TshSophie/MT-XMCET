<?php

use App\Http\Controllers\App\AppSettingController;
use App\Http\Controllers\App\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\System\SysUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('public.')->group(function (){
    Route::middleware('authWebToken')->get('/token', function (Request $request) {
        return ['msg' => 'token'];
    }, 'ddd');

    // 验证码
    Route::any('captcha', function() {
        return [
            'code' => 200,
            'msg' => 'ok',
            'data' => app('captcha')->create('default', true)
        ];
    });

    // 登录
    Route::post('login', [SysUserController::class, 'login']);
    // 退出
    Route::post('logout', [SysUserController::class, 'logout']);
    // 导出用户列表excel
    Route::post('test/importExcel', [SysUserController::class, 'importExcel']);

    // app客户端登录
    Route::get('app/user/token', [UserController::class, 'getToken']);   

    // 更新日志
    Route::get('app/appSetting/getUpdateLogs', [AppSettingController::class, 'getUpdateLogs']);   

});
