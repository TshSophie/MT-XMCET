<?php

namespace App\Services\System;

use App\Models\System\SysDictData;
use App\Models\System\SysDictType;

class SysDictService
{
    /**
     * 查询字典类型列表
     */
    static function getTypeList($pageSize, $dictName, $date, $dictType, $status) {
        $searchCondition = SysDictType::orderBy('update_time', 'desc');
        // 日期范围查询
        if($date) {
            $searchCondition = $searchCondition->whereBetween('create_time', $date);
        }
        // 名称模糊匹配
        if($dictName) {
            $searchCondition = $searchCondition->where('dict_name', 'like', $dictName . '%');
        }
        // 类型模糊匹配
        if($dictType) {
            $searchCondition = $searchCondition->where('dict_type', 'like', $dictType . '%');
        }
        // 状态匹配
        if($status != null){
            $searchCondition = $searchCondition->where('status','=', $status);
        }
        $paginator = $searchCondition
        ->paginate($pageSize, '*', 'pageNum');
        return [
            'total' => $paginator->total(),
            'rows' => $paginator->items(),        
        ];
    }

    /**
     * 查询字典数据列表
     */
    static function getDataList($pageSize, $dictLabel, $dictType, $status) {
        $searchCondition = SysDictData::orderBy('dict_sort', 'asc');
        // 标签模糊匹配
        if($dictLabel) {
            $searchCondition = $searchCondition->where('dict_label', 'like', $dictLabel . '%');
        }
        // 类型模糊匹配
        if($dictType) {
            $searchCondition = $searchCondition->where('dict_type', 'like', $dictType . '%');
        }
        // 状态匹配
        if($status != null){
            $searchCondition = $searchCondition->where('status','=', $status);
        }
        $paginator = $searchCondition
        ->paginate($pageSize, '*', 'pageNum');
        return [
            'total' => $paginator->total(),
            'rows' => $paginator->items(),        
        ];
    }

    /**
     * 查询字段类型
     */
    static function getType($id)
    {
        return SysDictType::find($id);
    }

    /**
     * 查询字数据
     */
    static function getData($id)
    {
        return SysDictData::find($id);
    }

    /**
     * 新增字典类型
     */
    static function addType($data) {        
        $insert = [        
          'dict_name' => $data['dictName'],
          'dict_type'=> $data['dictType'],
          'status'=> array_key_exists('status', $data) ? $data['status'] : 0,
          'remark'=> array_key_exists('remark', $data) ? $data['remark'] : "",
        ];
        $SysDictType = SysDictType::create($insert);
        return $SysDictType;
    }

    /**
     * 新增字典数据
     */
    static function addData($data) {        
        $insert = [        
          'dict_label' => $data['dictLabel'],
          'dict_type'=> $data['dictType'],
          'dict_value'=> $data['dictValue'],
          'dict_sort'=> $data['dictSort'],
          'status'=> array_key_exists('status', $data) ? $data['status'] : 0,
          'remark'=> array_key_exists('remark', $data) ? $data['remark'] : "",
        ];
        $SysDictData = SysDictData::create($insert);
        return $SysDictData;
    }

    /**
     * 修改字典类型
     */
    static function updateType($data) {        
        $SysDictType = SysDictType::find($data['dictId']);
        $preDictTypeName = $SysDictType->dict_type;
        $SysDictType->dict_name = $data['dictName'];
        $SysDictType->dict_type = $data['dictType'];
        $SysDictType->status = array_key_exists('status', $data) ? $data['status'] : $SysDictType->status ;
        $SysDictType->remark = array_key_exists('remark', $data) ? $data['remark'] : $SysDictType->remark ;
        $SysDictType->save();
        // 联动修改字典数据
        SysDictData::where('dict_type', '=', $preDictTypeName)->update([
            'dict_type' => $data['dictType']
        ]);
        return $SysDictType;
    }

    /**
     * 修改字典数据
     */
    static function updateData($data) {        
        $SysDictType = SysDictData::find($data['dictCode']);
        $SysDictType->dict_label = $data['dictLabel'];
        $SysDictType->dict_type = $data['dictType'];
        $SysDictType->dict_value = $data['dictValue'];
        $SysDictType->dict_sort = $data['dictSort'];
        $SysDictType->status = array_key_exists('status', $data) ? $data['status'] : $SysDictType->status ;
        $SysDictType->remark = array_key_exists('remark', $data) ? $data['remark'] : $SysDictType->remark ;
        $SysDictType->save();
        return $SysDictType;
    }

    /**
     * 删除字典类型
     */
    static function deleteType($id) {
      $idArr = explode(',', $id);
      $dictTypes = SysDictType::whereIn('dict_id', $idArr)->get()->toArray();
      $dictTypes = array_column($dictTypes, 'dict_type');
      SysDictType::whereIn('dict_id', $idArr)->delete();
      SysDictData::whereIn('dict_type', $dictTypes)->delete();
    }

    /**
     * 删除字典数据
     */
    static function deleteData($id) {
      $idArr = explode(',', $id);
      SysDictData::whereIn('dict_code', $idArr)->delete();
    }
}