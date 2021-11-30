<?php

namespace App\Services\Admin;

use App\Models\App\AppUser;

class UserService
{
    static public function getList($pageSize, $nickName)
    {
        $searchCondition = AppUser::orderBy('create_time', 'desc');
        if ($nickName) {
            $searchCondition = $searchCondition->where('nick_name', 'like', '%' . $nickName . '%');
        }
        // 获取列表数据
        $paginator = $searchCondition->paginate($pageSize, '*', 'pageNum');
        return [
            'total' => $paginator->total(),
            'rows' => $paginator->items(),
        ];
    }
}