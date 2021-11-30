<?php

namespace App\Models\App;

use Illuminate\Database\Eloquent\Model;

class AppUser extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_user';

    /**
     * 与表关联的主键
     * 默认就是id
     * @var string
     */
    protected $primaryKey = 'id';

     /**
     * 是否主动维护时间戳
     *
     * @var bool
     */
    public $timestamps = true;

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

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
        'openid',
        'nick_name',
        'avatar',
        'status',
        'mobile',
        'email',
        'gender',
        'location',
        'create_time',
        'update_time',
    ];

    static public function getByOpenid($openId)
    {
        return self::where(['openid' => $openId])->first();
    }

    static public function newUserByOpenid($openid)
    {
        # code...
    }
}
