<?php

namespace App\Models\App;

use App\Models\System\SysUser;
use Illuminate\Database\Eloquent\Model;

class AppCourse extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_course';

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
        'name',
        'content',
        'book_type',
        'qa',
        'solution',
        'translate',
        'audio',
        'type',
        'vocabulary',
        'user_id',
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

    public function getAudioAttribute($value)
    {
        if(!$value) {
            return '';
        }
        return $value;
    }

    // 关联user表
    public function user()
    {
        return $this->hasOne(SysUser::class, 'id', 'user_id');
    }
}
