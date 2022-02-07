<template>
	<view class="container">
		<view class="title">
			WEEk{{week}} - 错题集
		</view>
		<view class="list-box">
			<view class="wrong-course" v-for="item in list" :key="item.id">
				<view class="sub-title">
					{{item.title}}
				</view>
				<view class="wrong-list">
					<SingleChoiceForResultCard :cards="item.exercises"/>
				</view>
				<view class="goto arrow" @click="gotoCourse(item)">进入该课程</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SingleChoiceForResultCard from '@/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue'
    import { getWrongCollectionByWeek } from '@/api/section'

	export default {
		name: 'Practice',
		components: {
			SingleChoiceForResultCard
		},
		data() {
			return {
				week: '',
				list: [
					{
					  "id": 2,
					  "title": "xxx",
					  "exercises": [
						{
							id: 1,
							question: "49. Why can certain species of tilapia sometimes survive around Lake Natron?",
							options: [
								{
									value: '1',
									label: "A) They can take refuge in the less salty waters."
								},
								{
									value: '2',
									label: "B) They can flee quick enough from predators."
								},
								{
									value: '3',
									label: "C) They can take refuge in the less salty waters."
								},
								{
									value: '4',
									label: "D) They can flee quick enough from predators."
								},
							],
							answer: '1',
							choice: '1'
						},
						{
							id: 2,
							question: "49. Why can certain species of tilapia sometimes survive around Lake Natron?",
							options: [
								{
									value: '1',
									label: "A) They can take refuge in the less salty waters."
								},
								{
									value: '2',
									label: "B) They can flee quick enough from predators."
								},
								{
									value: '3',
									label: "C) They can take refuge in the less salty waters."
								},
								{
									value: '4',
									label: "D) They can flee quick enough from predators."
								},
							],
							answer: '1',
							choice: '1'
						},
					  ],
					  
					},
				]
			};
		},
		onLoad(options) {
			this.week = options.week
			getWrongCollectionByWeek({
				bookId: options.bookId,
				week: options.week
			}).then(response => {
				this.list = response.data
			})
		},
		methods: {
			gotoCourse(item) {
				// 课程类型(1:阅读，2：听力, 3:导读、作文)
				if(item.type == 1) {
					uni.navigateTo({
						url: '/pages/readingCourse/readingCourse?courseId=' + item.id 
						+ '&bookId=' + item.bookId
						+ '&sectionId=' + item.sectionId,
					})
				} else if(item.type == 2) {
					uni.navigateTo({
						url: '/pages/listeningCourse/listeningCourse?courseId=' + item.id
						+ '&bookId=' + item.bookId
						+ '&sectionId=' + item.sectionId,
					})
				} else {
					uni.navigateTo({
						url: '/pages/writingCourse/writingCourse?courseId=' + item.id
						+ '&bookId=' + item.bookId
						+ '&sectionId=' + item.sectionId,
					})
				}
			}
		}

	}
</script>

<style lang="less">
.container {
	.title {
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		height: 120rpx;
		line-height: 120rpx;  
	}
	.list-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.wrong-course{
			width: 100%;
			padding: 10rpx;  
			background: white;
			margin-bottom: 20rpx;
			border-radius: 30px;
			.sub-title {
				margin: 10px 0;
				font-size: 30rpx;
				font-weight: bold;
				text-align: center;
			}
			.wrong-list {
				width: 95%;
				margin: 0 auto;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}
			.goto {
				font-size: 28rpx;
				margin: 10rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				padding-right: 5px;
				color: #1889e4;
			}
		}
		
	}
}
</style>
