<?php

namespace App\Services\App;

use App\Models\App\AppUserPlan;
use App\Models\App\AppWordRoot;
use App\Models\App\AppWordRootDailySnapshoot;
use App\Models\App\AppWordRootRecord;
use App\Services\Common\WxTokenService;
use Carbon\Carbon;

class AppWordrootService
{
    public static function setPlan($dailyCount, $total)
    {
        $uid = WxTokenService::getCurrentUid();
        $delSnapshootFlag = false;
        $plan = AppUserPlan::where([
            'user_id' => $uid
        ])->first();
        if($dailyCount != $plan->daily_target) {
            $delSnapshootFlag = true;
        }
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
        if($delSnapshootFlag) {
            // 清空今日背词快照
            $startTime = Carbon::now()->startOfDay();
            $endTime = Carbon::now()->endOfDay();
            AppWordRootDailySnapshoot::where([
                'user_id' => $uid
            ])
            ->whereBetWeen('create_time', [
                $startTime,
                $endTime
            ])
            ->delete();
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

    public static function getScheduleList() {
        $uid = WxTokenService::getCurrentUid();
        // 获取用户今日背词快照
        $startTime = Carbon::now()->startOfDay();
        $endTime = Carbon::now()->endOfDay();
        $snapshoot = AppWordRootDailySnapshoot::where([
            'user_id' => $uid,
        ])->whereBetWeen('create_time', [
            $startTime,
            $endTime
        ])->first();
        if($snapshoot) {
            // 使用已经生成的计划快照
            $words = json_decode($snapshoot->snapshoot, true);
            $wordIds = array_column($words, 'id');
            $list = AppWordRoot::whereIn('id', $wordIds)
                ->get()
                ->toArray();
            foreach ($list as &$item) {
                foreach ($words as $word) {
                    if($item['id'] == $word['id']) {
                        $item['status'] = $word['status'];
                        break;
                    }
                }
            }
        } else {
            // 生成今日计划背词
            $plan = AppUserPlan::where([
                'user_id' => $uid
            ])->first();
            // 每日计划个数
            $dailyCount = $plan->daily_target;
            // 查询dailyCount个未背词汇
            // 已经掌握
            $record = AppWordRootRecord::where([
                'user_id' => $uid,
                'status' => 1
            ])
            ->where('look', '>', 0)
            ->get();
            if(count($record)) {
                $wordIds = array_column($record->toArray(), 'word_id');
                // 所有未掌握的词汇
                $list = AppWordRoot::whereNotIn('id', $wordIds)
                ->limit($dailyCount)
                ->get();
            } else {
                $list = AppWordRoot::limit($dailyCount)
                ->get();
            }

            // 生成今日快照
            $snapshoot = [];
            foreach ($list as &$item) {
                $item['status'] = 0;
                $snapshoot[] = [
                    'status' => 0,
                    'id' => $item['id']
                ];
            }
            AppWordRootDailySnapshoot::insert([
                'user_id' => $uid,
                'create_time' => date('Y-m-d H:i:s', time()),
                'snapshoot' => json_encode($snapshoot)
            ]);
        }
        return $list;
    }

    public static function updateRecord($id, $status)
    {
        $uid = WxTokenService::getCurrentUid();
        // 更新记录表
        $record = AppWordRootRecord::where([
            'user_id' => $uid,
            'word_id' => $id
        ])->first();
        if($record) {
            $record->look += 1;
            $record->status = $status;
            $record->save();
        } else {
            AppWordRootRecord::insert([
                'user_id' => $uid,
                'word_id' => $id,
                'create_time' => date('Y-m-d H:i:s', time()),
                'look' => 0
            ]);
        }
        // 更新快照
        $startTime = Carbon::now()->startOfDay();
        $endTime = Carbon::now()->endOfDay();
        $snapshoot = AppWordRootDailySnapshoot::where([
            'user_id' => $uid,
        ])->whereBetWeen('create_time', [
            $startTime,
            $endTime
        ])->first();
        if($snapshoot) {
            $wordlist = json_decode($snapshoot->snapshoot, true);
            foreach ($wordlist as &$word) {
                if($word['id'] == $id) {
                    $word['status'] = $status;
                    break;
                }
            }
            $snapshoot->snapshoot = json_encode($wordlist);
            $snapshoot->save();
        }
    }
}