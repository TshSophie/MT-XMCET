<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class SysUserRole extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_user_role';

    
    // 关联角色表
    public function role()
    {
      return $this->hasOne(
        SysRole::class,
        'role_id', 
        'role_id'
      );
    }
    
    // 关联用户表
    public function user()
    {
      return $this->hasOne(
        SysUser::class,
        'user_id', 
        'role_id'
      );
    }
}
