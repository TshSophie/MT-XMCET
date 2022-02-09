<?php
namespace App\Services\Admin;

use App\Models\App\AppCourse;
use App\Models\App\AppCourseExercises;
use App\Models\App\AppUserCourseRecord;

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

    public static function getOne($id)
    {
        $course = AppCourse::with('exercises')->find($id);
        return $course;
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
           
        // 构造数据
        $exercisesUpdate = json_decode($data['qaList'], true);
        $saveData = [];
        foreach ($exercisesUpdate as $exercise) {
            $saveData[] = [
                'course_id' => $AppCourse['id'],
                'question' => $exercise['question'],
                'answer' => $exercise['answer'],
                'order' => $exercise['order'],
                'options' => json_encode($exercise['options']),
            ];
        }
        if(count($saveData)) {
            AppCourseExercises::insert($saveData);
        }
        return $AppCourse;
    }

    static public function updateOne($data)
    {
        $AppCourse = AppCourse::where('id', '=', $data['id'])->first();
        array_key_exists('name', $data) ? $AppCourse->name = $data['name'] : "";
        array_key_exists('content', $data) ? $AppCourse->content = $data['content'] : "";
        array_key_exists('type', $data) ? $AppCourse->type = $data['type'] : "";
        array_key_exists('bookType', $data) ? $AppCourse->book_type = $data['bookType'] : "";
        // array_key_exists('qa', $data) ? $AppCourse->qa = $data['qa'] : "";
        array_key_exists('solution', $data) ? $AppCourse->solution = $data['solution'] : "";
        array_key_exists('translate', $data) ? $AppCourse->translate = $data['translate'] : "";
        array_key_exists('vocabulary', $data) ? $AppCourse->vocabulary = $data['vocabulary'] : "";
        array_key_exists('audio', $data) ? $AppCourse->audio = $data['audio'] : "";
        array_key_exists('status', $data) ? $AppCourse->status = $data['status'] : "";
        array_key_exists('remark', $data) ? $AppCourse->remark = $data['remark'] : "";
        $AppCourse->save();
        // 更新exercises
        // 清空之前的数据
        AppCourseExercises::where([
            'course_id' => $data['id']
        ])->delete();
        AppUserCourseRecord::where([
            'course_id' => $data['id']
        ])->update([
            'delete' => 1
        ]);
        // 构造数据
        $exercisesUpdate = json_decode($data['qaList'], true);
        $saveData = [];
        foreach ($exercisesUpdate as $exercise) {
            $saveData[] = [
                'course_id' => $data['id'],
                'question' => $exercise['question'],
                'answer' => $exercise['answer'],
                'options' => json_encode($exercise['options']),
                'create_time' => Date('Y-m-d h:i:s', time())
            ];
        }
        if(count($saveData)) {
            AppCourseExercises::insert($saveData);
        }
    }

    static public function del($id)
    {
        $idArr = explode(',', $id);
        AppCourse::whereIn('id', $idArr)->delete();
    }
}
