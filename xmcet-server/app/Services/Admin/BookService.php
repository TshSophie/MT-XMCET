<?php
namespace App\Services\Admin;

use App\Models\App\AppSection;
use App\Models\App\AppSectionCourse;

class BookService {
    static function getList($pageSize, $title, $subTitle, $week, $bookid, $beginTime, $endTime) {
        $searchCondition = AppSection::with('user')->orderBy('id', 'asc');
        // 名称模糊匹配
        if($title) {
            $searchCondition = $searchCondition->where('title', 'like', '%' . $title . '%');
        }
        // 名称模糊匹配
        if($subTitle) {
            $searchCondition = $searchCondition->where('sub_title', 'like', '%' . $subTitle . '%');
        }
        // 周次匹配
        if($week) {
            $searchCondition = $searchCondition->where('week', '=', $week);
        }
        // book匹配
        if($bookid) {
            $searchCondition = $searchCondition->where('bookid', '=', $bookid);
        }
        // 日期范围查询
        if($beginTime && $endTime) {
            $searchCondition = $searchCondition->whereBetween('create_time', [$beginTime, $endTime]);
        }
        $paginator = $searchCondition
        ->paginate($pageSize, '*', 'pageNum');
        $sections = $paginator->items();
        // 处理子项
        $sectionIds = array_column($sections, 'id');
        $allCourse = AppSectionCourse::with('course')->whereIn('section_id', $sectionIds)->get()->toArray();
        for($i = 0; $i < count($sections); $i++) {
            $item = $sections[$i];
            $sections[$i]['course'] = array_column(array_filter($allCourse, function($v) use ($item){
                // return $courseS['course']['section_id'] == $item['id'];
                // var_dump($v);
                return $v['section_id'] == $item['id'];
            }), 'course');
        }
        return [
            'total' => $paginator->total(),
            'rows' => $sections,        
        ];
    }
}