<?php

namespace App\Services\App;

use App\Models\App\AppCourse;
use App\Models\App\AppCourseExercises;
use App\Models\App\AppUserCourseRecord;
use App\Services\Common\WxTokenService;

class AppCourseService
{
    public static function getDetail($courseId) {
        // 课程内容
        $courseContent = AppCourse::where('id', $courseId)->first();
        // 课程练习
        $exercises = AppCourseExercises::where([
            'course_id' => $courseId
        ])
        ->orderBy('order', 'asc')
        ->get();
        // 用户课程做题记录
        $uid = WxTokenService::getCurrentUid();
        $records = AppUserCourseRecord::where([
            'course_id' => $courseId,
            'user_id' => $uid
        ])->get();

        // 用户选项 exercises_id => answer
        $userChoices = [];
        foreach ($records as $record) {
            $userChoices[$record['exercises_id']] = $record['user_answer'];
        }
        $result = [];
        foreach ($exercises as $exercise) {
            $result[] = [
                'id' => $exercise['id'],
                'question' => $exercise['question'],
                'answer' => $exercise['answer'],
                'choice' => count($userChoices) > 0 ? $userChoices[$exercise['id']] : '',
                'options' => json_decode($exercise['options']),
            ];
        }
        return [
            'course' => $courseContent,
            'exercises' => $result
        ];
    }

    public static function saveAnswer($data) {
        $uid = WxTokenService::getCurrentUid();
        $answerData = [];
        $answers = $data['answers'];
        foreach ($answers as $answer) {
            $answerData[] = [
                'course_id' => $data['courseId'],
                'section_id' => $data['sectionId'],
                'book_id' => $data['bookId'],
                'user_id' => $uid,
                'status' => $answer['status'],
                'user_answer' => $answer['choice'],
                'exercises_id' => $answer['id'],
                'create_time' => date('Y-m-d H:i:s', time())
            ];
        }
        // 查询用户提交过答案
        $records = AppUserCourseRecord::where([
            'course_id' => $data['courseId'],
            'section_id' => $data['sectionId'],
            'book_id' => $data['bookId'],
            'user_id' => $uid
        ])->get();
        if(count($records)) {
            $insertData = [];
            $exerciseIds = array_column($records->toArray(), 'exercises_id');
            // 使用更新操作
            foreach ($answerData as $item) {
                if(in_array($item['exercises_id'], $exerciseIds)) {
                    AppUserCourseRecord::where([
                        'course_id' => $item['course_id'],
                        'section_id' => $item['section_id'],
                        'book_id' => $item['book_id'],
                        'user_id' => $uid,
                        'exercises_id' => $item['exercises_id'],
                    ])->update([
                        'status' => $item['status'],
                        'user_answer' => $item['user_answer'],
                        'update_time' => date('Y-m-d H:i:s', time())
                    ]);
                } else {
                    $insertData[] = $item;
                }
            }
            if(count($insertData)) {
                AppUserCourseRecord::insert($insertData);
            }
        } else {
            // 创建
            AppUserCourseRecord::insert($answerData);
        }
    }

}