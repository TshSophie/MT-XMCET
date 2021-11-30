<?php

namespace App\Services\System;

use App\Models\System\SysDept;

class SysDeptService
{
    /**
     * 新增部门
     */
    static function newOne($data) {
        // 查询parentId对应数据的ancestors
        if($data['parentId'] == 0){
            $ancestors = 0;
        } else {
            $pDept = SysDept::where('dept_id', $data['parentId'])->first();
            $ancestors = $pDept->ancestors . ','. $data['parentId'];
        }
        $insert = [
          'parent_id' => $data['parentId'],
          'dept_name'=> $data['deptName'],
          'order_num'=> $data['orderNum'],
          'leader'=> array_key_exists('leader', $data) ? $data['leader'] : "",
          'phone'=> array_key_exists('phone', $data) ? $data['phone'] : "",
          'email'=> array_key_exists('email', $data) ? $data['email'] : "",
          'status'=>  array_key_exists('status', $data) ? $data['status'] : 0,
          'ancestors' =>  $ancestors,
        ];
        $SysDept = SysDept::create($insert);
        return $SysDept;
    }

    /**
     * 修改部门
     */
    static function modifyOne($data) {
        // 查询parentId对应数据的ancestors
        if($data['parentId'] == 0){
            $ancestors = 0;
        } else {
            $pDept = SysDept::where('dept_id', $data['parentId'])->first();
            $ancestors = $pDept->ancestors . ','. $data['parentId'];
        }
        $SysDept = SysDept::find($data['deptId']);
        $SysDept->parent_id = $data['parentId'];
        $SysDept->dept_name = $data['deptName'];
        $SysDept->order_num = $data['orderNum'];
        $SysDept->leader = array_key_exists('leader', $data) ? $data['leader'] : '';
        $SysDept->phone = array_key_exists('phone', $data) ? $data['phone'] : '';
        $SysDept->email = array_key_exists('email', $data) ? $data['email'] : '';
        $SysDept->status = array_key_exists('status', $data) ? $data['status'] : 0;
        $SysDept->ancestors =  $ancestors;
        $SysDept->save();
        return $SysDept;
    }

    /**
     * 删除部门
     */
    static function deleteOne($id) {
      $idArr = explode(',', $id);
      // SysDept::whereIn('id', $idArr)->update(['status'=>0]);
      SysDept::whereIn('dept_id', $idArr)->orWhere('parent_id', $idArr)->delete();       
    }
}