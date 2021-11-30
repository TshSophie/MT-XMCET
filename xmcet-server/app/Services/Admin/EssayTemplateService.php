<?php

namespace App\Services\Admin;

use App\Models\App\AppEssayTemplate;

class EssayTemplateService
{
    static public function getList($pageSize, $title, $status, $beginTime, $endTime)
    {
        $searchCondition = AppEssayTemplate::orderBy('id', 'asc');
        if ($title) {
            $searchCondition = $searchCondition->where('title', 'like', '%' . $title . '%');
        }
        // 状态匹配
        if($status != null) {
            $searchCondition = $searchCondition->where('status','=', $status);
        }
        // 日期范围查询
        if($beginTime && $endTime) {
            $searchCondition = $searchCondition->whereBetween('create_time', [$beginTime, $endTime]);
        }
        // 获取列表数据
        $paginator = $searchCondition->paginate($pageSize, '*', 'pageNum');
        return [
            'total' => $paginator->total(),
            'rows' => $paginator->items(),
        ];
    }

    static public function addOne($data)
    {
        $insert = [
            'title' => $data['title'],
            'content' => $data['content'],
            'status' => $data['status'],
            'user_id' => app('jwtAuth')->userInfo()->id,
            'author' => $data['author'],
        ];
        $data = AppEssayTemplate::create($insert);
        return $data;
    }

    static public function updateOne($data)
    {
        $AppCourse = AppEssayTemplate::where('id', '=', $data['id'])->first();
        array_key_exists('title', $data) ? $AppCourse->title = $data['title'] : "";
        array_key_exists('content', $data) ? $AppCourse->content = $data['content'] : "";
        array_key_exists('author', $data) ? $AppCourse->author = $data['author'] : "";
        array_key_exists('status', $data) ? $AppCourse->status = $data['status'] : "";
        $AppCourse->author = app('jwtAuth')->userInfo()->id;
        $AppCourse->save();
        return $AppCourse;
    }

    static public function del($id)
    {
        $idArr = explode(',', $id);
        AppEssayTemplate::whereIn('id', $idArr)->delete();
    }
}
