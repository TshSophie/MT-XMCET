<?php

use App\Http\Controllers\App\AppArticleControlller;
use App\Http\Controllers\App\AppCourseController;
use App\Http\Controllers\App\AppFeedbackController;
use App\Http\Controllers\App\AppSectionController;
use App\Http\Controllers\App\AppUserCollectController;
use App\Http\Controllers\App\AppUserLikeController;
use App\Http\Controllers\App\AppUserSubscribeController;
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
    // 课程习题提交
    Route::post('app/course/answer', [AppCourseController::class, 'postAnswer']);
    
    // 反馈
    Route::get('app/feedback/getListByUser', [AppFeedbackController::class, 'getListByUser']);
    Route::get('app/feedback/postByUser', [AppFeedbackController::class, 'postByUser']);
    // 首页文章列表
    Route::get('app/article/getListForIndexPage', [AppArticleControlller::class, 'getListForIndexPage']);
    Route::get('app/article/getDetail', [AppArticleControlller::class, 'getDetail']);
    // 用户点赞文章
    Route::post('app/userLike/article', [AppUserLikeController::class, 'userSetLikeArticle']);
    // 用户点赞文章列表
    Route::get('app/userLike/articleList', [AppUserLikeController::class, 'getUserLikeArticleList']);
    // 用户收藏文章
    Route::post('app/userCollect/article', [AppUserCollectController::class, 'userSetCollectArticle']);
    // 用户收藏文章列表
    Route::get('app/userCollect/articleList', [AppUserCollectController::class, 'getUserCollectArticleList']);
    // 用户订阅文章专栏
    Route::post('app/userSubscribe/articleCategory', [AppUserSubscribeController::class, 'userSubscribeArticle']);
    // 用户订阅文章专栏列表
    Route::get('app/userSubscribe/articleCategoryList', [AppUserSubscribeController::class, 'getUserSubscribeArticleCategoryList']);
});
