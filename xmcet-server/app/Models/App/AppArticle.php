<?php

namespace App\Models\App;

use App\Models\System\SysUser;
use Illuminate\Database\Eloquent\Model;

class AppArticle extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_article';

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
    public $timestamps = false;

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
        'category_id',
        'user_id',
        'author',
        'title',
        'content',
        'desc',
        'type',
        'url',
        'allow_comment',
        'status',
        'copyfrom',
        'sort',
        'top',
        'read',
        'praise',
        'create_time',
        'update_time',
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

    public function getContentAttribute($value)
    {
        return htmlspecialchars_decode($value);
    }

    // 关联user表
    public function user()
    {
        return $this->hasOne(SysUser::class, 'id', 'user_id');
    }
}
