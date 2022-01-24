<?php

namespace App\Models\App;

use Illuminate\Database\Eloquent\Model;

class AppUserCollect extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_user_collect';

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
        'type',
        'type_id',
        'status',
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

    // 关联文章表
    public function article()
    {
        return $this->hasOne(AppArticle::class, 'id', 'type_id');
    }
}
