<?php

use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\SectionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WordRootController;
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

Route::name('admin.')->group(function (){
    /********************** 课程 **************************************************************** */
    // 课程列表
    Route::get('admin/course/list', [CourseController::class, 'list']);
    Route::get('admin/course/byBook', [CourseController::class, 'getCoursesByBookId']);
    // 回显课程信息
    Route::get('admin/course/{id}', [CourseController::class, 'getOne'])->where(['id' => '[0-9]+']);
    // 新增课程
    Route::post('admin/course', [CourseController::class, 'addOne']);
    // 修改课程
    Route::post('admin/updateCourse', [CourseController::class, 'updateOne']);
    // 删除课程
    Route::delete('admin/course/{id}', [CourseController::class, 'del']);
    /********************** 章节 **************************************************************** */
    // 章节列表
    Route::get('admin/section/list', [SectionController::class, 'list']);
    // 回显章节信息
    Route::get('admin/section/{id}', [SectionController::class, 'getOne'])->where(['id' => '[0-9]+']);
    // 新增章节
    Route::post('admin/section', [SectionController::class, 'addOne']);
    // 修改章节
    Route::put('admin/section', [SectionController::class, 'updateOne']);
    // 删除章节
    Route::delete('admin/section/{id}', [SectionController::class, 'del']);
    // 获取章节课程
    Route::get('admin/section/course/{id}', [SectionController::class, 'getSectionCourse']);
    // 新增章节课程
    Route::post('admin/section/course', [SectionController::class, 'addSectionCourse']);
    // 修改章节课程
    Route::put('admin/section/course', [SectionController::class, 'updateSectionCourse']);
    // 删除章节课程
    Route::delete('admin/section/course/{id}', [SectionController::class, 'delSectionCourse']);
    /********************** book **************************************************************** */
    // book列表
    Route::get('admin/book/all', [BookController::class, 'all']);
    // 回显book信息
    Route::get('admin/book/{id}', [BookController::class, 'getOne'])->where(['id' => '[0-9]+']);
    // 新增book
    Route::post('admin/book', [BookController::class, 'addOne']);
    // 修改book
    Route::put('admin/book', [BookController::class, 'updateOne']);
    // 删除book
    Route::delete('admin/book/{id}', [BookController::class, 'del']);
    /********************** wordRoot **************************************************************** */
    // wordRoot列表
    Route::get('admin/wordRoot/list', [WordRootController::class, 'list']);
    // 回显wordRoot信息
    Route::get('admin/wordRoot/{id}', [WordRootController::class, 'getOne'])->where(['id' => '[0-9]+']);
    // 新增wordRoot
    Route::post('admin/wordRoot', [WordRootController::class, 'addOne']);
    // 修改wordRoot
    Route::put('admin/wordRoot', [WordRootController::class, 'updateOne']);
    // 删除wordRoot
    Route::delete('admin/wordRoot/{id}', [WordRootController::class, 'del']);
    /********************** Article **************************************************************** */
    // wordRoot列表
    Route::get('admin/article/list', [ArticleController::class, 'list']);
    // 回显wordRoot信息
    Route::get('admin/article/{id}', [ArticleController::class, 'getOne'])->where(['id' => '[0-9]+']);
    // 新增wordRoot
    Route::post('admin/article', [ArticleController::class, 'addOne']);
    // 修改wordRoot
    Route::put('admin/article', [ArticleController::class, 'updateOne']);
    // 删除wordRoot
    Route::delete('admin/article/{id}', [ArticleController::class, 'del']);
    /********************** user **************************************************************** */
    // user列表
    Route::get('admin/user/list', [UserController::class, 'list']);
});
