<?php

namespace App\Models\App;

use Illuminate\Database\Eloquent\Model;

class AppUserSubscribe extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_user_subscribe';

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

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'channel_type',
        'channel_id',
        'status',
        'create_time',
        'update_time'
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

    // 关联文章栏目
    public function articleCategory()
    {
        return $this->hasOne(AppArticleCategory::class, 'id', 'channel_id');
    }
}
