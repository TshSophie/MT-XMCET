<template>
	<view class="container">
		<view class="title">
			xxx - 错题集
		</view>
		<view class="list-box">
			<view class="wrong-course" v-for="(item, index) in list" :key="item.id">
				<view class="sub-title">
					{{item.subject.title}}{{item.subject.subTitle}} - {{item.course.name}}
				</view>
				<view class="wrong-list">
					<SingleChoiceForResultCard :cards="item.wrongs" @submit="submitAnswer" class="question"/>
				</view>
				<view class="goto arrow" @click="gotoCourse">进入该课程</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SingleChoiceForResultCard from '@/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue'

	export default {
		name: 'Practice',
		components: {
			SingleChoiceForResultCard
		},
		data() {
			return {
				list: [
					{
					  "id": 2,
					  "subjectId": 2,
					  "courseId": 2,
					  "wrongs": [
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
					  "status": 1,
					  "course": {
					    "id": 2,
					    "name": "长篇阅读",
					    "type": 0
					  },
					  "subject": {
					    "id": 2,
					    "title": "第2关",
					    "subTitle": "Reading"
					  }
					},
					{
					  "id": 3,
					  "subjectId": 2,
					  "courseId": 2,
					  "wrongs": [
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
					  "status": 1,
					  "course": {
					    "id": 2,
					    "name": "长篇阅读",
					    "type": 0
					  },
					  "subject": {
					    "id": 2,
					    "title": "第2关",
					    "subTitle": "Reading"
					  }
					},
				]
			};
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
