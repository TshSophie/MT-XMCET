<template>
	<view class="container">
		<view class="title">
			WEEk{{week}} - 词汇
		</view>
		<view class="list-box">
			<view class="word-course" v-for="item in list" :key="item.id">
				<view class="sub-title">
					{{item.title}} 
				</view>
				<view class="word-list" v-for="vocabulary in item.vocabulary" :key="vocabulary.word">
					<view class="word-item">
						<view class="word">{{vocabulary.word}}</view>
						<view class="translate">{{vocabulary.translate}}</view>
					</view> 
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import { getVocabularyListByWeek } from '@/api/section'
	export default {
		data() {
			return {
				week: '',
				list: [
					// {
					//   "id": 1,
					//   "title": "技巧学习",
					//   "vocabulary": [
					//     {
					//       "word": "analysis ",
					//       "translate": " 分析，分解；梗概，要略；[数]解析；验定；"
					//     },
					//     {
					//       "word": "analogy",
					//       "translate": "类似，相似；比拟，类比；类推；"
					//     },
					//     {
					//       "word": "analogous",
					//       "translate": "相似的，可比拟的；<生>同功的；模拟式；"
					//     }
					//   ]
					// },
				]
			};
		},
		onLoad(options) {
			this.week = options.week
			getVocabularyListByWeek({
				bookId: options.bookId,
				week: options.week
			}).then(response => {
				this.list = response.data
			})
		}
	}
</script>

<style lang="less">
.container {
	.title {
		font-size: 35rpx;
		font-weight: bold;
		text-align: center;
		height: 120rpx;
		line-height: 120rpx;  
	}
	.list-box {
		width: 100%;
		display: flex;
		display: -webkit-flex; 
		justify-content: center;
		-webkit-justify-content: center;
		align-items:center;
		-webkit-align-items: center;
		flex-direction: column;  

		.word-course {
			width: 90%;  
			padding: 10rpx;  
			background: white;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			.sub-title {
				// height: 80rpx;
				line-height: 80rpx;
				font-size: 30rpx;
				font-weight: bold;
				// white-space: normal;
				// word-wrap: break-word;
				text-align: center;
			}
			.word-list {
				width: 100%;
				display: flex;
				display: -webkit-flex; 
				justify-content: center;
				-webkit-justify-content: center;
				align-items:center;
				-webkit-align-items: center;
				flex-direction: column;
				.word-item {
					width: 95%;
					background: rgb(238, 240, 236);
					margin-top: 10rpx;
					border-radius: 5rpx;
					padding: 10rpx;

					.word {
						font-weight: bolder;
					}

					.translate {
						margin-top: 5px;
						font-size: 13px;
					}
				}
			}
		}
	}
}
</style>
