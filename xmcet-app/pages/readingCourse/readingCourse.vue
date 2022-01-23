<template>
	<view class="page">
		<Tabs v-model="currentTab" @tab-click="handleClick" :tabs="tabs"></Tabs>
		<!--内容合子  -->
		<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab" :style="{height: (windowHeight - 110) + 'px'}">        
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
				   <Practice :title="courseInfo.title" :content="courseInfo.content" :exercises="exercises" @submit="submitAnswer"/>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
				   <Answer :content="exercises"/>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
					<Translate :content="courseInfo.translate"/>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scoll-h" >
					<Analysis :content="courseInfo.solution"/>
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
	import { getDetail, postAnswer } from '@/api/course'

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
				bookId: '',
				sectionId: '',
				// 课程id
				courseId: '',
				currentTab: 0,
				tabs:["练习", "答案", "翻译", "解析"],
				windowHeight: 0,
				courseInfo: {},
				exercises: {}
			}
		},
		onLoad(option) {
			this.courseId = option.courseId
			this.bookId = option.bookId
			this.sectionId = option.sectionId
			// 重新设置标题
			this.setNavBarTitle()
			const res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight
			this.getDetail()
		},
		methods: {
			getDetail() {
				getDetail({courseId: this.courseId}).then(response => {
					this.courseInfo = response.data.course 
					this.exercises = response.data.exercises
				})
			},
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
			},
			submitAnswer(result) {
				postAnswer({
					bookId: this.bookId,
					sectionId: this.sectionId,
					courseId: this.courseId,
					answers: result.map(item => {
						return {
							id: item.id,
							choice: item.choice,
							status: item.choice == item.answer ? 1 : 0
						}
					})
				}).then(response => {
					uni.showToast({
						title: '提交成功',
						icon: 'success',
						duration: 2000
					});
					this.getDetail()
				})
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
