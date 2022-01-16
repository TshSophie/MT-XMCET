<?php

namespace App\Services\App;

use App\Models\App\AppSection;
use App\Models\App\AppSectionCourse;
use App\Models\App\AppUserCourseRecord;
use App\Services\Common\WxTokenService;

class AppSectionService
{
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
                    'weekName' => 'WEEK' . $data['week']
                ];
            } else {
                $index = array_search($data['week'], $weeks);
                $dataByWeek[$index]['itemList'][] = $data;
            }
        }
        return $dataByWeek;
    }

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

}