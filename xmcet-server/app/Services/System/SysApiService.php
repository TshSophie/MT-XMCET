<?php

namespace App\Services\System;

use App\Models\System\SysApi;
use App\Services\Common\JwtAuthService;

class SysApiService
{
    /**
     * 新增api
     */
    static function newOne($data) {
        $insert = [        
          'parent_id' => $data['parentId'],
          'api_name'=> $data['apiName'],
          'type'=> $data['type'],
          'order_num'=> $data['orderNum'],
          'api_type'=> array_key_exists('apiType', $data) ? $data['apiType'] : "",
          'description'=> array_key_exists('description', $data) ? $data['description'] : "",
          'path'=> array_key_exists('path', $data) ? $data['path'] : "",
          'create_by'=> (new JwtAuthService())->userInfo()['user_name'],
          'status'=> array_key_exists('status', $data) ? $data['status'] : 0,
          'remark'=> array_key_exists('remark', $data) ? $data['remark'] : "",
        ];
        $SysApi = SysApi::create($insert);
        return $SysApi;
    }

    /**
     * 修改api
     */
    static function modifyOne($data) {
        $SysApi = SysApi::find($data['apiId']);
        $SysApi->parent_id = array_key_exists('parentId', $data) ? $data['parentId'] : "";
        $SysApi->api_name = array_key_exists('apiName', $data) ? $data['apiName'] : "";
        $SysApi->api_type = array_key_exists('apiType', $data) ? $data['apiType'] : "";
        $SysApi->type = array_key_exists('type', $data) ? $data['type'] : "";
        $SysApi->order_num = array_key_exists('orderNum', $data) ? $data['orderNum'] : "";
        $SysApi->path = array_key_exists('path', $data) ? $data['path'] : "";
        $SysApi->description = array_key_exists('description', $data) ? $data['description'] : "";
        $SysApi->remark = array_key_exists('remark', $data) ? $data['remark'] : "";
        $SysApi->update_by = (new JwtAuthService())->userInfo()['user_name'];
        $SysApi->status = array_key_exists('status', $data) ? $data['status'] : 0;
        $SysApi->save();
        return $SysApi;
    }

    /**
     * 删除api
     */
    static function deleteOne($id) {
      $idArr = explode(',', $id);
      // SysApi::whereIn('id', $idArr)->update(['status'=>0]);
      SysApi::whereIn('api_id', $idArr)->delete();
    }
}