<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class SysMenu extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_menu';

    /**
     * 与表关联的主键
     * 默认就是id
     * @var string
     */
    protected $primaryKey = 'menu_id';

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
        'menu_name', 
        'order_num',
        'path',
        'component',
        'is_frame',
        'menu_type',
        'visible',
        'perms',
        'icon',
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
    public function pMenu()
    {
        return $this->hasOne('App\Models\System\SysMenu','id', 'parent_id');
    }
}
