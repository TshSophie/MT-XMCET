<?php

namespace App\Services\Admin;

use App\Models\App\AppWordRoot;

class WordRootService
{
    static public function getList($pageSize, $word)
    {
        $searchCondition = AppWordRoot::orderBy('id', 'asc');
        if ($word) {
            $searchCondition = $searchCondition->where('word', 'like', '%' . $word . '%');
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
            'word' => $data['word'],
            'mean' => $data['mean'],
            'detail' => $data['detail'],
        ];
        $data = AppWordRoot::create($insert);
        return $data;
    }

    static public function updateOne($data)
    {
        $AppCourse = AppWordRoot::where('id', '=', $data['id'])->first();
        array_key_exists('word', $data) ? $AppCourse->word = $data['word'] : "";
        array_key_exists('mean', $data) ? $AppCourse->mean = $data['mean'] : "";
        array_key_exists('detail', $data) ? $AppCourse->detail = $data['detail'] : "";
        $AppCourse->save();
        return $AppCourse;
    }

    static public function del($id)
    {
        $idArr = explode(',', $id);
        AppWordRoot::whereIn('id', $idArr)->delete();
    }
}
