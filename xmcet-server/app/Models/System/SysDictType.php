<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class SysDictType extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_dict_type';

    /**
     * 与表关联的主键
     * 默认就是id
     * @var string
     */
    protected $primaryKey = 'dict_id';

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
        'dict_name', 'dict_type', 
        'status', 'remark',
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
}
