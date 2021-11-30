<?php
namespace App\Services\Admin;

use App\Models\App\AppCourse;

class CourseService {
    static function getList($pageSize, $name, $status, $beginTime, $endTime) {
        $searchCondition = AppCourse::with('user')->orderBy('id', 'asc');
        // 名称模糊匹配
        if($name) {
            $searchCondition = $searchCondition->where('name', 'like', '%' . $name . '%');
        }
        // 状态匹配
        if($status != null) {
            $searchCondition = $searchCondition->where('status','=', $status);
        }
        // 日期范围查询
        if($beginTime && $endTime) {
            $searchCondition = $searchCondition->whereBetween('create_time', [$beginTime, $endTime]);
        }
        $paginator = $searchCondition
        ->paginate($pageSize, '*', 'pageNum');
        return [
            'total' => $paginator->total(),
            'rows' => $paginator->items(),        
        ];
    }

    public static function addOne($data) {
        $insert = [        
            'name' => $data['name'],
            'content'=> $data['content'],
            'type'=> $data['type'],
            'book_type'=> $data['bookType'],
            'user_id'=> app('jwtAuth')->userInfo()->id,
            'qa'=> array_key_exists('qa', $data) ? $data['qa'] : '',
            'solution'=> array_key_exists('solution', $data) ? $data['solution'] : '',
            'translate'=> array_key_exists('translate', $data) ? $data['translate'] : '',
            'vocabulary'=> array_key_exists('vocabulary', $data) ? $data['vocabulary'] : '',
            'audio'=> array_key_exists('audio', $data) ? $data['audio'] : '',
            'status'=> array_key_exists('status', $data) ? $data['status'] : 0,
            'remark'=> array_key_exists('remark', $data) ? $data['remark'] : "",
          ];
          $AppCourse = AppCourse::create($insert);
          return $AppCourse;
    }

    static public function updateOne($data)
    {
        $AppCourse = AppCourse::where('id', '=', $data['id'])->first();
        array_key_exists('name', $data) ? $AppCourse->name = $data['name'] : "";
        array_key_exists('content', $data) ? $AppCourse->content = $data['content'] : "";
        array_key_exists('type', $data) ? $AppCourse->type = $data['type'] : "";
        array_key_exists('bookType', $data) ? $AppCourse->book_type = $data['bookType'] : "";
        array_key_exists('qa', $data) ? $AppCourse->qa = $data['qa'] : "";
        array_key_exists('solution', $data) ? $AppCourse->solution = $data['solution'] : "";
        array_key_exists('translate', $data) ? $AppCourse->translate = $data['translate'] : "";
        array_key_exists('vocabulary', $data) ? $AppCourse->vocabulary = $data['vocabulary'] : "";
        array_key_exists('audio', $data) ? $AppCourse->audio = $data['audio'] : "";
        array_key_exists('status', $data) ? $AppCourse->status = $data['status'] : "";
        array_key_exists('remark', $data) ? $AppCourse->remark = $data['remark'] : "";
        $AppCourse->save();
        return $AppCourse;
    }

    static public function del($id)
    {
        $idArr = explode(',', $id);
        AppCourse::whereIn('id', $idArr)->delete();
    }
}
