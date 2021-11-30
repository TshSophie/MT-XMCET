<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class SysApi extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_api';

    /**
     * 与表关联的主键
     * 默认就是id
     * @var string
     */
    protected $primaryKey = 'api_id';

     /**
     * 是否主动维护时间戳
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
        'parent_id', 
        'api_name', 
        'path',
        'order_num',
        'description',
        'type',
        'api_type',
        'create_by',
        'update_by',
        'status',
        'remark', 
    ];


    const CREATED_AT = 'create_time';
    const UPDATED_AT = 'update_time';

    public function getCreateTimeAttribute($value)
    {
        return Date('Y-m-d h:i:s', strtotime($value));
    }

    public function getUpdateTimeAttribute($value)
    {
        return Date('Y-m-d h:i:s', strtotime($value));
    }

    // 关联自身表
    public function parent()
    {
        return $this->hasOne('App\Models\System\SysApi','id', 'parent_id');
    }
}
