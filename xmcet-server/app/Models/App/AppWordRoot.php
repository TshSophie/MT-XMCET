<?php

namespace App\Models\App;

use Illuminate\Database\Eloquent\Model;

class AppWordRoot extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_word_root';

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
        'word',
        'mean',
        'detail',
    ];
}
