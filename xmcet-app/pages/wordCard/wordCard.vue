<template>
	<view class="container">
		<span class="close" @click="handleBack">x</span>
		<view class="header"> 
			还需学习5，复习5
		</view>
		<view class='content'>
			<view class="word">   
				{{word.word}}
			</view>
			<view class="mean">
				释义： {{word.mean}}
			</view>
			<view class="detail">
				<view class="detail-item" v-for="(detail, index) in word.detail" :key="detail.word">
					<view class="item-word">{{index+1}}. {{detail.word}}</view>
					<view class="item-translare">{{detail.translate}}</view>
				</view>     
			</view>
		</view>
		<view class="option">
			<text class="btn btn-left">认识</text>
			<text class="btn btn-middle">模糊</text>
			<text class="btn btn-right">不认识</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				word: 
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
			}
		},
		methods: {
			handleBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="less" scoped>
.container {	
	position: relative;
	box-sizing: border-box;
	padding-top: calc(var(--status-bar-height) + 10px);
	height: 100vh;
	// background: white;
	display: flex;
	flex-direction: column;
	.header {
		width: 100%;
		text-align: center;
		height: 20px;
		font-size: 13px;
		color: rgb(109, 99, 99);
		margin: 0 auto;
	}
	.content {
		box-sizing: border-box;
		padding: 15px;
		flex: 1;
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
	.option {
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding-bottom: 40px;
		.btn {
			border-radius: 10px;	
			width: 70px;
			height: 70px;
			text-align: center;
			line-height: 70px;
			color: #fff;
			&.btn-left {
				background: green;
			}
			&.btn-middle {
				background: rgb(0, 122, 255);
			}
			&.btn-right {
				background: crimson;
			}
		}
	}
	.close {
		@size: 40px;
		position: absolute;
		left: 15px;
		top: calc(var(--status-bar-height) + 5px);
		cursor: pointer;
		width: @size;
		height: @size;
		text-align: center;
		line-height: @size - 5px;
		font-size: @size;
		border: solid 1px #000;
		border-radius: @size;
	}
}

</style>
