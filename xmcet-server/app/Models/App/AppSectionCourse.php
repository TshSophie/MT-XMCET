<?php

namespace App\Models\App;

use App\Models\System\SysUser;
use Illuminate\Database\Eloquent\Model;

class AppSectionCourse extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_section_course';

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
        'section_id',
        'course_id',
        'sort'
    ];

    // 关联course表
    public function course()
    {
        return $this->hasOne(AppCourse::class, 'id', 'course_id');
    }

    // 关联section表
    public function section()
    {
        return $this->hasOne(AppSection::class, 'id', 'section_id');
    }
}
