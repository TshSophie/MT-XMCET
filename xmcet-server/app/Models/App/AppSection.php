<?php

namespace App\Models\App;

use App\Models\System\SysUser;
use Illuminate\Database\Eloquent\Model;

class AppSection extends Model
{
    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'app_section';

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
        'title',
        'bookid',
        'sub_title',
        'inorder',
        'week',
        'user_id',
        'remark',
    ];

    const CREATED_AT = 'create_time';
    const UPDATED_AT = 'update_time';

    public function getCreateTimeAttribute($value)
    {
        return Date('Y-m-d h:i:s', strtotime($value));
    }

    // 关联user表
    public function user()
    {
        return $this->hasOne(SysUser::class, 'id', 'user_id');
    }
}
