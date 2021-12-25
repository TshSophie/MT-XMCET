<template>
	<view class="page">
		<TabsUd v-model="currentTab" @tab-click="handleClick" :tabs="tabs"></TabsUd>
        <view class="tab-content" v-if="listMode">
            <view class="wordList-item" v-for="item in wordDataList" :key="item.id" @click="gotoWordRootDetail(item)">
                <view class="word"> {{item.word}}</view>
                <view class="translate">{{item.mean}}</view>
            </view>
        </view>
        <swiper class="tab-card" v-if="!listMode" previous-margin="50rpx" next-margin="50rpx" easing-function="linear">
            <swiper-item v-for="item in wordDataList" :key="item.id" >
                <view class='card'>
                    <view class='card-content'>
                        <view class="word">   
                            {{item.word}}
                        </view>
                        <view class="mean">
                            释义： {{item.mean}}
                        </view>
                        <view class="detail">
                            <view class="detail-item" v-for="(detail, index) in item.detail" :key="detail.word">
                                <view class="item-word">{{index+1}}. {{detail.word}}</view>
                                <view class="item-translare">{{detail.translate}}</view>
                            </view>     
                        </view>
                    </view>
                    <!-- <view class='card-bottom'>
                    </view> -->
                </view>
            </swiper-item>
        </swiper>
        <view class="tab-bottom"> 
			<image class="logo-left" src="../../static/assets/list.png" v-if="listMode" @click="switchListMode(false)"></image>
			<image class="logo-left" src="../../static/assets/card.png" v-if="!listMode" @click="switchListMode(true)"></image>
			<image class="logo-right" src="../../static/assets/shunxu.png" v-if="orderMode" @click="switchOrderMode(false)"></image>
			<image class="logo-right" src="../../static/assets/suiji.png" v-if="!orderMode" @click="switchOrderMode(true)"></image>
        </view>
	</view>
</template>

<script>
	import TabsUd from '@/components/TabsUd'
	export default {
		components: {
			TabsUd,
		},
		data() {
			return {
				title: '词根词缀',
				// 课程id
				id: '',
				currentTab: 0,
				tabs:[
                    {u: "全部", d: "120"},
                    {u: "记忆中", d: "2"},
                    {u: "陌生词", d: "128"},
                    {u: "已掌握", d: "0"},
                ],
				windowHeight: 0,
                wordDataList: [
                    {
                      "id": 1,
                      "word":"1amphi",
                      "mean":"两个，两种"
                    },
                    {"id": 2,"word":"2amphi","mean":"两个，两种两个，两种两个，两种",
                        "detail":[
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                            {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                            },
                        ],
                    },
                    {"id": 3,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 4,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 5,"word":"amphi","mean":"两个，两两个，两种两个，两种两个，两种两个，两种两个，两种两个，两种两个，两种种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 6,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 7,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 8,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 9,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 10,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 11,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 12,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 13,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 14,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 15,"word":"amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                    {"id": 16,"word":"16.amphi","mean":"两个，两种",
                        "detail":[ {
                            "word": "introduce",
                            "translate": "提出；介绍；引进；作为…的开头；"
                        }],
                    },
                ],
                listMode: true,
                orderMode: true
			}
		},
		onLoad(option) {
			this.id = option.id
			this.currentTab = option.type
			// 重新设置标题
			this.setNavBarTitle()
			const res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight
		},
		methods: {
			setNavBarTitle() {
				uni.setNavigationBarTitle({
					title: this.title
				});
			},
			handleClick(item) {
				this.currentTab = item
			},
            gotoWordRootDetail() {

            },
            switchListMode(mode) {
                this.listMode = mode
            },
            switchOrderMode(mode) {
                this.orderMode = mode
            }
		}
	}
</script>

<style lang="less" scoped>
@tabTopHeight: 60px;
@tabBottomHeight: 60px;
@listItemHeight: 60px;
.page {
	.tabs {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9999;
	}
	.tab-content {
		position: absolute;
        height: calc(100vh - @tabTopHeight - var(--window-top) - @tabBottomHeight);
		width: 100%;
		top: 60px;
		left: 0;
        overflow-y: scroll;
        .wordList-item {
            width: 100%;
            height: @listItemHeight;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            background: #fff;
            padding: 0 20px;

            .word {
                font-size: 18px;
                font-weight: bolder;
            }
            .translate {
                height: 20px;
                font-size: 12px;
                line-height: 12px;
                width: 100%;
                margin-top: 3px;
                color: #b0b0b0;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
	}
    .tab-card {
        position: absolute;
        height: calc(100vh - @tabTopHeight - var(--window-top) - @tabBottomHeight);
		width: 100%;
		top: 60px;
		left: 0;
        box-sizing: border-box;
        padding: 15px 0;
    
        .card {
            box-sizing: border-box;
            height: 100%;			  
            margin-right: 10px;
            border-radius: 15px;
            background: white;
            display: flex;
            flex-direction: column;
            padding: 10px;
            overflow-y: scroll;
            .word {
                text-align: center;
                font-size: 16px;
                line-height: 40px;
                font-weight: bold;
            }
            .mean {
                font-size: 14px;
            }
            .detail-item {
                font-size: 13px;
                margin-top: 10px;
            }
        }
    }

    .tab-bottom {
        position: absolute;
        height: @tabBottomHeight;
		width: 100%;
		bottom: 0;
		left: 0;
        background: #f7f7f7;
        display: flex;
        justify-content: space-around;
        align-items: center;

        image {
            // padding-left: 10px;
            width: 35px;
            height: 35px;

        }
        .logo-right {
            // padding-right: 10px;
        }
    }
}

</style>
