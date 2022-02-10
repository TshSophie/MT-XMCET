<template>
	<view class="page">
		<TabsUd v-model="currentTab" @tab-click="handleChangeTab" :tabs="tabs"></TabsUd>
        <scroll-view class="tab-content" scroll-y="true" @scrolltolower="lower" v-if="listMode">
            <view class="wordList-item" v-for="item in list" :key="item.id">
                <view class="word"> {{item.word}}</view>
                <view class="translate">{{item.mean}}</view>
            </view>
        </scroll-view>
        <swiper class="tab-card" 
        @change="handleChangeCard"
        v-if="!listMode" 
        previous-margin="50rpx" 
        next-margin="50rpx" 
        easing-function="linear">
            <swiper-item v-for="item in list" :key="item.id" >
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
                </view>
            </swiper-item>
        </swiper>
        <view class="tab-bottom"> 
			<image class="logo-left" src="../../static/assets/list.png" v-if="listMode" @click="switchListMode(false)"></image>
			<image class="logo-left" src="../../static/assets/card.png" v-else @click="switchListMode(true)"></image>
			<image class="logo-right" src="../../static/assets/shunxu.png" v-if="orderMode" @click="switchOrderMode(false)"></image>
			<image class="logo-right" src="../../static/assets/suiji.png" v-else @click="switchOrderMode(true)"></image>
        </view>
	</view>
</template>

<script>
    import { getList } from '@/api/wordRoot'
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
                    {u: "全部", d: ""},
                    {u: "记忆中", d: ""},
                    {u: "陌生词", d: ""},
                    {u: "已掌握", d: ""},
                ],
				windowHeight: 0,
                list: [
                    // {
                    //   "id": 1,
                    //   "word":"1amphi",
                    //   "mean":"两个，两种"
                    // },
                ],
                listMode: true,
                orderMode: false,
				// 分页页面
				dataPage: 0,
				// 每页数据条数
				dataSize: 10,
				//推荐数据      
				hasMore: true,
				total: 0,
			}
		},
		onLoad(option) {
			this.id = option.id
			this.currentTab = option.type
			// 重新设置标题
			this.setNavBarTitle()
			const res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight
            // 获取列表数据
            this.getList()
		},
		methods: {
		    // 触底
            lower(e) {
                if(this.hasMore) {
                    this.getList();
                } else {
                    uni.showToast({
                        title: '没有更多了',
                        icon: 'none',
                        duration: 1000
                    });
                }
            },
            handleChangeCard(event) {
                const {current} = event.detail
                if(current == this.list.length - 1) {
                    this.getList()
                }
            },
            getList() {
				// 页码加1
				++this.dataPage;
				// 加载推荐数据
				var param = {
					pageNum: this.dataPage,
					pageSize: this.dataSize,
                    order: this.orderMode + 0,
                    type: this.currentTab
				}
                getList(param).then(res => {
                    this.tabs = [
                        {u: "全部", d: res.data.tabs[0]},
                        {u: "记忆中", d: res.data.tabs[1]},
                        {u: "陌生词", d: res.data.tabs[2]},
                        {u: "已掌握", d: res.data.tabs[3]},
                    ]
                    
					let resData = res.data.rows  
					//拼接达到数据的累加
					//console.log(res.header)  //在响应头中X-Total-Count代表数据总数
					//判断是否还有数据
					const hasMore = this.dataPage * this.dataSize < (res.data.total - 0)
                    this.list = this.list.concat(resData)
					this.hasMore = hasMore
					this.total = res.data.total
                })
            },
			setNavBarTitle() {
				uni.setNavigationBarTitle({
					title: this.title
				});
			},
			handleChangeTab(item) {
				this.currentTab = item
                this.dataPage = 0
                this.list = []
                this.getList()
			},
            // 列表/卡片模式切换
            switchListMode(mode) {
                this.listMode = mode
            },
            // 顺序/逆序模式切换
            switchOrderMode(mode) {
                this.orderMode = mode
				this.dataPage = 0
				this.list = []
				this.getList()
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
