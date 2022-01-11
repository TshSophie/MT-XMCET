<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\App\AppSetting;
use Illuminate\Http\Request;

class AppSettingController extends Controller 
{
    public function getUpdateLogs() {

      $data = AppSetting::get();
      return gfResponse()->json($data);
    }
}