<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class SysLoginlog extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'sys_loginlog';

    /**
     * 与表关联的主键
     * 默认就是id
     * @var string
     */
    protected $primaryKey = 'info_id';

     /**
     * 是否主动维护时间戳
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
        'user_name', 
        'ipaddr', 
        'login_location',
        'browser',
        'os',
        'status',
        'msg',
        'login_time',
    ];

    public function getLoginTimeAttribute($value)
    {
        return Date('Y-m-d h:i:s', strtotime($value));
    }
}
