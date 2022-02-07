<?php

namespace App\Services\App;

use App\Models\App\AppSection;
use App\Models\App\AppSectionCourse;
use App\Models\App\AppUserCourseRecord;
use App\Services\Common\WxTokenService;

class AppSectionService
{
    // 获取章节列表
    public static function getSectionList($bookid) {
        $allData = AppSection::where([
            'bookid' => $bookid
        ])
        ->orderBy('week', 'asc')
        ->get()->toArray();
        // 查询用户闯关数据
        // 从该结果集取出id存入数组$sectionIds
        $sectionIds = array_column($allData, 'id');
        // 从user_course_record表查询出用户闯关记录
        $uid = WxTokenService::getCurrentUid();
        $records = AppUserCourseRecord::where([
            'user_id' => $uid,
            'book_id' => $bookid,
            'section_id' => $sectionIds
        ])->get()->toArray();

        // 按周次分组
        $dataByWeek = [];
        $weeks = [];
        for ($i=0; $i < count($allData); $i++) {
            $data = $allData[$i];
            if(count($records) > 0) {
                // 用户闯关状态
                $data['status'] = 1;
            } else {
                $data['status'] = 0;
            }
            if(!in_array($data['week'], $weeks)) {
                $weeks[] = $data['week'];
                $dataByWeek[] = [
                    'itemList' => [$data],
                    'weekName' => 'WEEK' . $data['week'],
                    'week' => $data['week']
                ];
            } else {
                $index = array_search($data['week'], $weeks);
                $dataByWeek[$index]['itemList'][] = $data;
            }
        }
        return $dataByWeek;
    }

    // 获取课程列表
    public static function getCourseListBySectionId($sectionId) {
        $sectionCourseList = AppSectionCourse::with('course')
        ->where([
            'section_id' => $sectionId
        ])
        ->orderBy('sort', 'asc')
        ->get()
        ->toArray();
        if(count($sectionCourseList) > 0) {
            // 查询用户闯关数据
            // 从该结果集取出id存入数组$courseId
            $courseIds = array_column($sectionCourseList, 'course_id');
            // 从user_course_record表查询出用户闯关记录
            $uid = WxTokenService::getCurrentUid();
            $records = AppUserCourseRecord::where([
                'user_id' => $uid,
                'section_id' => $sectionId,
                'course_id' => $courseIds
            ])->get()->toArray();
            $resultList = [];
            for ($i=0; $i < count($sectionCourseList); $i++) {
                $sectionCourse = $sectionCourseList[$i];
                if(count($records) > 0) {
                    // 用户闯关状态
                    $sectionCourse['status'] = 1;
                } else {
                    $sectionCourse['status'] = 0;
                }
                $resultList[] = [
                    'id' => $sectionCourse['course']['id'],
                    'name' => $sectionCourse['course']['name'],
                    'type' => $sectionCourse['course']['type'],
                    'status' => $sectionCourse['status'],
                ];
            }
            return $resultList;
        } else {
            return [];
        }
    }

    // 获取课程词汇列表按week
    public static function getVocabularyListByWeek($bookid, $week) {
        // $uid = WxTokenService::getCurrentUid();
        $sections = AppSection::where([
            'bookid' => $bookid,
            'week' => $week
        ])->get()->toArray();
        $sectionIds = array_column($sections, 'id');
        $sectionCourseData = AppSectionCourse::with(['course', 'section'])
        ->where([
            'section_id' => $sectionIds
        ])->get()->toArray();

        $course = [];
        foreach ($sectionCourseData as $item) {
            $course[] = [
                'id' => $item['course']['id'],
                'title' => $item['section']['sub_title'] . '-' . $item['course']['name'],
                'vocabulary' => json_decode($item['course']['vocabulary'])
            ];
        }
        return $course;
    }

    // 获取错题集按week
    public static function getWrongCollectionByWeek($bookid, $week) {
        $uid = WxTokenService::getCurrentUid();
        $sections = AppSection::where([
            'bookid' => $bookid,
            'week' => $week
        ])->get()->toArray();
        $sectionIds = array_column($sections, 'id');
        // 课程答题记录
        $records = AppUserCourseRecord::with(['exercises', 'course', 'section'])
        ->where([
            'section_id' => $sectionIds,
            'user_id' => $uid,
            'status' => 0
        ])
        ->get()
        ->toArray();

        $courseIds = array_unique(array_column($records, 'course_id'));
        $data = [];
        foreach($courseIds as $cid) {
            $exercisesList = [];
            $courseTemp = [];
            foreach ($records as $record) {
                if($cid == $record['course_id']) {
                    $exercises = $record['exercises'];
                    $result = [
                        'id' => $exercises['id'],
                        'question' => $exercises['question'],
                        'answer' => $exercises['answer'],
                        'choice' => $record['user_answer'],
                        'options' => json_decode($exercises['options']),
                    ];
                    // 构造数据
                    $exercisesList[] = $result;
                    // 缓存课程信息
                    $courseTemp = [
                        'id' => $record['course']['id'],
                        'type' => $record['course']['type'],
                        'bookId' => $record['book_id'],
                        'sectionId' => $record['section_id'],
                        'title' => $record['section']['sub_title'] . '-' . $record['course']['name'],
                    ];
                }
            }
            $data[] = [
                'id' => $courseTemp['id'],
                'title' => $courseTemp['title'],
                'type' => $courseTemp['type'],
                'bookId' => $courseTemp['bookId'],
                'sectionId' => $courseTemp['sectionId'],
                'exercises' => $exercisesList
            ];
        }

        return $data;
    }

}