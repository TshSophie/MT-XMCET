<template>
	<view>
		<tabs v-model="currentTab" @tab-click="handleClick" :tabs="tabs"></tabs>
		<!--内容合子  -->
		<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab">        
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
				   <Practice />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				22222222222222
			</swiper-item>
			<swiper-item>
				333333333333
			</swiper-item>
			<swiper-item>
				444444444444
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import tabs from '@/components/tabs/tabs.vue'
	import Practice from './components/Practise.vue'
	export default {
		components: {
			tabs,
			Practice
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
.tabs {
	// position: fixed;
	// top: 0;
	// left: 0;
	// z-index: 9999;
	// margin-top: 90rpx;
}
.tab-content {
	height: calc(100vh - 182rpx);
	.scoll-h {
		height: 100%;
	}
}
</style>
