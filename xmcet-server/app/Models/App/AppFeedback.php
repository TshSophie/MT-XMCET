<?php

namespace App\Models\App;

use Illuminate\Database\Eloquent\Model;

class AppFeedback extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_feedback';

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

    public function getImagesAttribute($value)
    {
        if($value) {
            return explode(',', $value);
        } else {
            return [];
        }
    }

    /**
     * 可批量赋值属性
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'type',
        'content',
        'link',
        'images',
        'user_id',
        'reply',
        'create_time',
        'update_time',
    ];

    protected $hidden = [
    ];
}
