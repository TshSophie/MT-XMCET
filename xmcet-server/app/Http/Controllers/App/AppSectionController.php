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
}
