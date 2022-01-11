<?php

namespace App\Models\App;

use Illuminate\Database\Eloquent\Model;

class AppUserCourseRecord extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_user_course_record';

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
        'user_id',
        'book_id',
        'section_id',
        'course_id',
        'exercises_id',
        'user_answer',
        'status'
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

    // 关联book表
    public function book()
    {
        return $this->hasOne(AppBook::class, 'id', 'book_id');
    }

    // 关联exercises表
    public function exercises()
    {
        return $this->hasOne(AppCourseExercises::class, 'id', 'exercises_id');
    }
}
