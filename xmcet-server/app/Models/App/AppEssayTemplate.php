<?php

namespace App\Models\App;

use App\Models\System\SysUser;
use Illuminate\Database\Eloquent\Model;

class AppEssayTemplate extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_essay_template';

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
    const DELETED_AT = 'delete_time';

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
        'title',
        'content',
        'user_id',
        'author',
        'status',
    ];

    // 关联user表
    public function user()
    {
        return $this->hasOne(SysUser::class, 'id', 'user_id');
    }
}
