<?php

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
    Route::get('app/user/token', [UserController::class, 'getToken']);   
    Route::put('app/user/authorizeUserInfo', [UserController::class, 'authorizeUserInfo']);   
});
