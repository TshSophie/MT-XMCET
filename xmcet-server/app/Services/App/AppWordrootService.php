<?php

namespace App\Services\App;

use App\Models\App\AppWordRoot;
use App\Models\App\AppWordRootRecord;
use App\Services\Common\WxTokenService;

class AppWordrootService
{
    public static function getList($pageSize, $order, $type)
    {
        $uid = WxTokenService::getCurrentUid();
        $tabs = [];
        $tabs[0] = AppWordRoot::count();

        $tabs[1] = AppWordRootRecord::where([
                'user_id' => $uid,
                'status' => '!=0',
            ])
            ->where('look', '>', 0)
            ->count();
        
        $tabs[2] = $tabs[0] - AppWordRootRecord::where([
                'user_id' => $uid,
            ])->count();
        
        $tabs[3] = AppWordRootRecord::where([
                'user_id' => $uid,
                'status' => '1',
            ])
            ->where('look', '>', 0)
            ->count();
        
        $paginator = AppWordRoot::orderBy('word',  $order ? 'desc' : 'asc');
        $wordIds = [];
        switch($type) {
            case 1:
                // 记忆中
                $record = AppWordRootRecord::where([
                    'user_id' => $uid,
                    'status' => '!=0',
                ])
                ->where('look', '>', 0)
                ->get();
                if(count($record)) {
                    $wordIds = array_column($record->toArray(), 'word_id');
                }
                $paginator = $paginator->whereIn('id', $wordIds);
                break;
            case 2:
                // 陌生
                $record = AppWordRootRecord::where([
                    'user_id' => $uid,
                ])
                ->get();
                if(count($record)) {
                    $wordIds = array_column($record->toArray(), 'word_id');
                    $paginator = $paginator->whereNotIn('id', $wordIds);
                }
                break;
            case 3:
                // 已经掌握
                $record = AppWordRootRecord::where([
                    'user_id' => $uid,
                    'status' => 1
                ])
                ->where('look', '>', 0)
                ->get();
                if(count($record)) {
                    $wordIds = array_column($record->toArray(), 'word_id');
                    $paginator = $paginator->whereIn('id', $wordIds);
                }
                break;
            default:
            break;
        }
        $paginator = 
        $paginator
        ->paginate($pageSize, '*', 'pageNum');
        $data = [
            'tabs' => $tabs,
            'total' => $paginator->total(),
            'rows' => $paginator->items(),        
        ];
        return $data;
    }
}