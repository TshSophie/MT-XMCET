<?php

use App\Http\Controllers\App\AppArticleControlller;
use App\Http\Controllers\App\AppSettingController;
use App\Http\Controllers\App\UserController;
use Illuminate\Support\Facades\Route;

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

Route::name('app-public.')->group(function (){
    // app客户端登录
    Route::get('app/user/token', [UserController::class, 'getToken']);   

    // 更新日志
    Route::get('app/appSetting/getUpdateLogs', [AppSettingController::class, 'getUpdateLogs']);   

    // 获取文章分类
    Route::get('app/article/category', [AppArticleControlller::class, 'getArticleCategory']);   
    // 获取文章列表
    Route::get('app/article/list', [AppArticleControlller::class, 'getArticleList']);   
    // 获取文章列表按分类
    Route::get('app/article/listByCategory', [AppArticleControlller::class, 'getArticleListByCategory']);   
});
