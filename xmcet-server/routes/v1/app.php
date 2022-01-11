<?php

use App\Http\Controllers\App\AppCourseController;
use App\Http\Controllers\App\AppFeedbackController;
use App\Http\Controllers\App\AppSectionController;
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

Route::name('app.')->group(function (){
    // 用户信息
    Route::put('app/user/authorizeUserInfo', [UserController::class, 'authorizeUserInfo']);   
    Route::get('app/user/getUserInfo', [UserController::class, 'getUserInfo']);

    // 闯关列表
    Route::get('app/section/getSectionList', [AppSectionController::class, 'getSectionList']);
    Route::get('app/section/getCourseListBySectionId', [AppSectionController::class, 'getCourseListBySectionId']);

    // 课程详情
    Route::get('app/course/getDetail', [AppCourseController::class, 'getDetail']);
    
    // 反馈
    Route::get('app/feedback/getListByUser', [AppFeedbackController::class, 'getListByUser']);
    Route::get('app/feedback/postByUser', [AppFeedbackController::class, 'postByUser']);
});
