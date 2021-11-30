<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class SysDept extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_dept';

    /**
     * 与表关联的主键
     * 默认就是id
     * @var string
     */
    protected $primaryKey = 'dept_id';

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
      'parent_id', 'dept_name', 
      'order_num',' status',
      'leader', 'phone',
      'email', 'ancestors',
   ];

    const CREATED_AT = 'create_time';
    const UPDATED_AT = 'update_time';
    // const DELETED_AT = 'delete_time';

    public function getCreateTimeAttribute($value)
    {
        return Date('Y-m-d h:i:s', strtotime($value));
    }

    public function getUpdateTimeAttribute($value)
    {
        return Date('Y-m-d h:i:s', strtotime($value));
    }

}
