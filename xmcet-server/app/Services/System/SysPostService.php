<?php

namespace App\Services\System;

use App\Models\System\SysPost;

class SysPostService
{
    public static function getList($pageSize, $postCode, $postName, $status) {
        $searchCondition =  new SysPost();
        // 模糊匹配
        if($postCode) {
          $searchCondition = $searchCondition->where('post_code', 'like',  $postCode . '%');
        }
        if($postName) {
          $searchCondition = $searchCondition->where('post_name', 'like',  $postName . '%');
        }
        if($status != null){
          $searchCondition = $searchCondition->where('status', '=',  $status);
        }
        $paginator = $searchCondition
        ->paginate($pageSize, '*', 'pageNum');
        return [
            'total' => $paginator->total(),
            'rows' => $paginator->items(),        
        ];
    }

    public static function addOne($data) {
        $insert = [        
            'post_name' => $data['postName'],
            'post_code'=> $data['postCode'],
            'post_sort'=> $data['postSort'],
            'status'=> array_key_exists('status', $data) ? $data['status'] : 0,
            'remark'=> array_key_exists('remark', $data) ? $data['remark'] : "",
          ];
          $SysDictType = SysPost::create($insert);
          return $SysDictType;
    }

    static function updateData($data) {
        $SysPost = SysPost::find($data['postId']);
        $SysPost->post_name = $data['postName'];
        $SysPost->post_code = $data['postCode'];
        $SysPost->post_sort = $data['postSort'];
        $SysPost->status = array_key_exists('status', $data) ? $data['status'] : $SysPost->status ;
        $SysPost->remark = array_key_exists('remark', $data) ? $data['remark'] : $SysPost->remark ;
        $SysPost->save();
        return $SysPost;
    }

    static function deleteData($id) {
        $idArr = explode(',', $id);
        SysPost::whereIn('post_id', $idArr)->delete();
    }
}