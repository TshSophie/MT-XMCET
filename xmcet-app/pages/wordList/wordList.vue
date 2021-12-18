<template>
	<view class="page">
		<TabsUd v-model="currentTab" @tab-click="handleClick" :tabs="tabs"></TabsUd>
        <view class="tab-content">
            <view class="wordList-item" v-for="item in wordDataList" :key="item.id" @click="gotoWordRootDetail(item)">
                <view class="word"> {{item.word}}</view>
                <view class="translate">{{item.mean}}</view>
            </view>
        </view>
        <view class="tab-bottom"> 
            <view class="logo-left">
                卡片
            </view>
            <view class="logo-right">
                顺序
            </view>
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
                    {"id": 2,"word":"2amphi","mean":"两个，两种两个，两种两个，两种"},
                    {"id": 3,"word":"amphi","mean":"两个，两种"},
                    {"id": 4,"word":"amphi","mean":"两个，两种"},
                    {"id": 5,"word":"amphi","mean":"两个，两两个，两种两个，两种两个，两种两个，两种两个，两种两个，两种两个，两种种"},
                    {"id": 6,"word":"amphi","mean":"两个，两种"},
                    {"id": 7,"word":"amphi","mean":"两个，两种"},
                    {"id": 8,"word":"amphi","mean":"两个，两种"},
                    {"id": 9,"word":"amphi","mean":"两个，两种"},
                    {"id": 10,"word":"amphi","mean":"两个，两种"},
                    {"id": 11,"word":"amphi","mean":"两个，两种"},
                    {"id": 12,"word":"amphi","mean":"两个，两种"},
                    {"id": 13,"word":"amphi","mean":"两个，两种"},
                    {"id": 14,"word":"amphi","mean":"两个，两种"},
                    {"id": 15,"word":"amphi","mean":"两个，两种"},
                    {"id": 16,"word":"16.amphi","mean":"两个，两种"},
                ]
			}
		},
		onLoad(option) {
			this.id = option.id
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
            padding: 10px 20px;

            .word {
                font-size: 18px;
                font-weight: bolder;
            }
            .translate {
                font-size: 12px;
            }
        }
	}
    .tab-bottom {
        position: absolute;
        height: @tabBottomHeight;
		width: 100%;
		bottom: 0;
		left: 0;

        display: flex;
        justify-content: space-around;
        align-items: center;

        .logo-left {
            // padding-left: 10px;
        }
        .logo-right {
            // padding-right: 10px;
        }
    }
}

</style>
