<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class SysUser extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_user';

    /**
     * 与表关联的主键
     * 默认就是id
     * @var string
     */
    protected $primaryKey = 'id';
    
    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
      'nick_name', 'user_name', 'phonenumber', 'dept_id',
      'email', 'password', 'sex', 'post_or_title', 'attributes',
      'status'
    ];
  
    protected $hidden = [
      'password'
    ];

    // 关联部门表
    public function dept()
    {
      return $this->hasOne('App\Models\System\SysDept','dept_id', 'dept_id');
    }

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
