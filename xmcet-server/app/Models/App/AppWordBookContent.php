<?php

namespace App\Models\App;

use App\Models\App\AppWordBook as AppAppWordBook;
use Illuminate\Database\Eloquent\Model;

class AppWordBook extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_word_book_content';

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
     * @var array
     */
    protected $fillable = [
        'word',
        'detail',
        'user_id',
        'word_book_id',
        'create_time',
        'update_time',
    ];

    protected $hidden = [
    ];

    // 关联user表
    public function user()
    {
        return $this->hasOne(AppUser::class, 'id', 'user_id');
    }

    // 关联wordBook表
    public function wordBook()
    {
        return $this->hasOne(AppAppWordBook::class, 'id', 'word_book_id');
    }
}
