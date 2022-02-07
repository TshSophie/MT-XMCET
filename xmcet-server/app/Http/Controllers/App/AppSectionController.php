<?php

namespace App\Http\Controllers\App;

use App\ConstParam\ErrorConst;
use App\Http\Controllers\Controller;
use App\Services\App\AppSectionService;
use App\Utils\CommonUtil;
use Illuminate\Http\Request;

class AppSectionController extends Controller
{
    public function getSectionList(Request $request)
    {
        $bookid = $request->input('bookid');
        if (!$bookid) {
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE_MSG, ErrorConst::PARAM_ERROR_CODE);
        }
        $data = AppSectionService::getSectionList($bookid);
        return gfResponse()->json($data);
    }

    public function getCourseListBySectionId(Request $request)
    {
        $sectionId = $request->input('sectionId');
        if (!$sectionId) {
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE_MSG, ErrorConst::PARAM_ERROR_CODE);
        }
        $data = AppSectionService::getCourseListBySectionId($sectionId);
        return gfResponse()->json($data);
    }

    public function getVocabularyListByWeek(Request $request)
    {
        $bookId = $request->input('bookId');
        $week = $request->input('week');
        if (!$bookId || !$week) {
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE_MSG, ErrorConst::PARAM_ERROR_CODE);
        }
        $data = AppSectionService::getVocabularyListByWeek($bookId, $week);
        return gfResponse()->json($data);
    }

    public function getWrongCollectionByWeek(Request $request)
    {
        $bookId = $request->input('bookId');
        $week = $request->input('week');
        if (!$bookId || !$week) {
            CommonUtil::throwException(ErrorConst::PARAM_ERROR_CODE_MSG, ErrorConst::PARAM_ERROR_CODE);
        }
        $data = AppSectionService::getWrongCollectionByWeek($bookId, $week);
        return gfResponse()->json($data);
    }
}
