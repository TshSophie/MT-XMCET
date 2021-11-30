<?php

use App\Http\Controllers\Common\UploadController;
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

Route::name('common.')->group(function (){
    Route::any('common/upload/editor', [UploadController::class, 'editorUpload']);   
});
