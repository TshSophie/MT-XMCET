<?php
namespace App\Services\Admin;

use App\Models\App\AppSection;
use App\Models\App\AppSectionCourse;

class SectionService {
    static function getList($pageSize, $title, $subTitle, $week, $bookid, $beginTime, $endTime) {
        $searchCondition = AppSection::with('user')->orderBy('week', 'asc');
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
            $sectionCourse = array_filter($allCourse, function($v) use ($item){
                return $v['section_id'] == $item['id'];
            });
            $sections[$i]['sectionCourse'] = $sectionCourse;
        }
        return [
            'total' => $paginator->total(),
            'rows' => $sections,        
        ];
    }

    public static function addOne($data) {
        $insert = [        
            'title' => $data['title'],
            'sub_title'=> $data['subTitle'],
            'week'=> $data['week'],
            'bookid'=> $data['bookid'],
            'inorder'=> $data['inorder'],
            'remark'=> array_key_exists('remark', $data) ? $data['remark'] : "",
            'user_id' => app('jwtAuth')->userInfo()->id
        ];
        $AppCourse = AppSection::create($insert);
        return $AppCourse;
    }

    public static function updateOne($data) {
        $AppCourse = AppSection::where('id', '=', $data['id'])->first();
        array_key_exists('title', $data) ? $AppCourse->title = $data['title'] : "";
        array_key_exists('subTitle', $data) ? $AppCourse->sub_title = $data['subTitle'] : "";
        array_key_exists('bookid', $data) ? $AppCourse->bookid = $data['bookid'] : "";
        array_key_exists('week', $data) ? $AppCourse->week = $data['week'] : "";
        array_key_exists('inorder', $data) ? $AppCourse->inorder = $data['inorder'] : "";
        array_key_exists('remark', $data) ? $AppCourse->remark = $data['remark'] : "";
        $AppCourse->save();
        return $AppCourse;
    }

    static public function del($id)
    {
        $idArr = explode(',', $id);
        AppSection::whereIn('id', $idArr)->delete();
        // 删除关联的数据
        AppSectionCourse::whereIn('section_id', $idArr)->delete();
    }


    public static function addSectionCourse($data) {
        $insert = [        
            'course_id'=> $data['courseId'],
            'section_id'=> $data['sectionId'],
            'sort'=> $data['sort'],
        ];
        $AppCourse = AppSectionCourse::create($insert);
        return $AppCourse;
    }

    public static function updateSectionCourse($data) {
        $AppCourse = AppSectionCourse::where('id', '=', $data['id'])->first();
        array_key_exists('sectionId', $data) ? $AppCourse->section_id = $data['sectionId'] : "";
        array_key_exists('courseId', $data) ? $AppCourse->course_id = $data['courseId'] : "";
        array_key_exists('sort', $data) ? $AppCourse->sort = $data['sort'] : "";
        $AppCourse->save();
        return $AppCourse;
    }

    public static function delSectionCourse($id)
    {
        $idArr = explode(',', $id);
        AppSectionCourse::whereIn('id', $idArr)->delete();
    }
}