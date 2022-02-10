<?php

namespace App\Services\App;

use App\Models\App\AppUserPlan;
use App\Models\App\AppWordRoot;
use App\Models\App\AppWordRootRecord;
use App\Services\Common\WxTokenService;
use Carbon\Carbon;

class AppWordrootService
{
    public static function setPlan($dailyCount, $total)
    {
        $uid = WxTokenService::getCurrentUid();
        $plan = AppUserPlan::where([
            'user_id' => $uid
        ])->first();
        if($plan) {
            $plan->total = $total;
            $plan->daily_target = $dailyCount;
            $plan->save();
        } else {
            AppUserPlan::insert([
                'user_id' => $uid,
                'name' => '闯关计划',
                'total' => $total,
                'daily_target' => $dailyCount,
                'create_time' => date('Y-m-d H:i:s', time())
            ]);
        }
    }

    public static function getBasicInfo()
    {
        $uid = WxTokenService::getCurrentUid();
        // tab数据
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
        
        // 学习进度,总体
        $plan = AppUserPlan::where([
            'user_id' => $uid
        ])->first();
        // 今日计划进度
        $startTime = Carbon::now()->startOfDay();
        $endTime = Carbon::now()->endOfDay();
        $todayProcess = AppWordRootRecord::where([
            'user_id' => $uid,
        ])
        ->whereBetWeen('create_time', [
            $startTime,
            $endTime
        ])
        ->count();
        return [
            'tabs' => $tabs,
            'plan' => $plan,
            'todayProcess' => $todayProcess
        ];
    }

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