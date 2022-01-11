<?php

namespace App\Models\App;

use Illuminate\Database\Eloquent\Model;

class AppWordBook extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_word_book';

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

    public function getCreateTimeAttribute($value)
    {
        return Date('Y-m-d h:i:s', strtotime($value));
    }

    /**
     * 可批量赋值属性
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'cover_image',
        'user_id',
        'fork_from_id',
        'create_time',
    ];

    protected $hidden = [
    ];

    // 关联user表
    public function user()
    {
        return $this->hasOne(AppUser::class, 'id', 'from_uid');
    }

    // 关联wordBook表
    public function wordBook()
    {
        return $this->hasOne(self::class, 'id', 'fork_from_id');
    }
}
