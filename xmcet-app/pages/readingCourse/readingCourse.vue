<template>
	<view class="page">
		<tabs v-model="currentTab" @tab-click="handleClick" :tabs="tabs"></tabs>
		<!--内容合子  -->
		<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab">        
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
				   <Practice />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
				   <Answer />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
					<Translate/>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
					<Analysis/>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import tabs from '@/components/tabs/tabs.vue'
	import Practice from './components/Practise.vue'
	import Answer from './components/Answer.vue'
	import Analysis from './components/Analysis.vue'
	import Translate from './components/Translate.vue'
	export default {
		components: {
			tabs,
			Practice,
			Answer,
			Analysis,
			Translate
		},
		data() {
			return {
				title: '阅读练习',
				// 课程id
				id: '',
				currentTab: 0,
				tabs:["练习", "答案", "翻译", "解析"],
			}
		},
		onLoad(option) {
			 this.id = option.id
			 // 重新设置标题
			 this.setNavBarTitle()
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
			switchTab(event) {
				this.currentTab = event.detail.current
				console.log(this.currentTab)
			}
		}
	}
</script>

<style lang="less" scoped>
.page {
	// background: #fff;
}
.tabs {
	// position: fixed;
	// top: 0;
	// left: 0;
	// z-index: 9999;
	// margin-top: 90rpx;
}
.tab-content {
	margin-top: 15rpx;
	height: calc(100vh - 182rpx);
	.scoll-h {
		height: 100%;
	}
}
</style>
