<template>
	<view class="page">
		<Tabs v-model="currentTab" @tab-click="handleClick" :tabs="tabs"></Tabs>
		<!--内容合子  -->
		<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab" :style="{height: (windowHeight - 110) + 'px'}">        
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
	import Tabs from '@/components/Tabs/Tabs.vue'
	import Practice from './components/Practise.vue'
	import Answer from './components/Answer.vue'
	import Analysis from './components/Analysis.vue'
	import Translate from './components/Translate.vue'
	import { getDetail } from '@/api/course'
	export default {
		components: {
			Tabs,
			Practice,
			Answer,
			Analysis,
			Translate,
		},
		data() {
			return {
				title: '阅读练习',
				// 课程id
				courseId: '',
				currentTab: 0,
				tabs:["练习", "答案", "翻译", "解析"],
				windowHeight: 0
			}
		},
		onLoad(option) {
			this.courseId = option.courseId
			// 重新设置标题
			this.setNavBarTitle()
			const res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight
			getDetail({courseId: this.courseId}).then(response => {
				console.log(response)
			})
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
	position: relative;
	.tabs {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9999;
	}
	.tab-content {
		position: absolute;
		width: 100%;
		top: 50px;
		left: 0;
	    // height: calc(100vh - 40px - 60px - var(--window-top));

		.scoll-h {
			height: 100%;
		}
	}
}

</style>
