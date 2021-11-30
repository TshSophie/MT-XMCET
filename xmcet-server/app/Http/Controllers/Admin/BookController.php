<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\App\AppBook;

class BookController extends Controller 
{
    /**
     * 列表
     */
    public function all() {
      $data = AppBook::get();
      return gfResponse()->json($data);
    }
}