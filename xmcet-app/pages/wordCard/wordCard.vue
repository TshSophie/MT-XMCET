<template>
	<view class="container">
		<span class="close" @click="handleBack">x</span>
		<view class="header">
			学习{{studyCount}}|复习{{remaindCount}}
		</view>
		<view class='content' v-if="readyList.length > 0">
			<view class="word">
				{{readyList[0].word}}
			</view>
			<view class="mean">
				释义： {{readyList[0].mean}}
			</view>
			<view class="detail">
				<view class="detail-item" v-for="(detail, index) in readyList[0].detail" :key="detail.word">
					<view class="item-word">{{index+1}}. {{detail.word}}</view>
					<view class="item-translare">{{detail.translate}}</view>
				</view>
			</view>
		</view>
		<view class="content-finish" v-else>
			恭喜你，完成今日闯关任务！
		</view>
		<view class="option" v-if="readyList.length">
			<text class="btn btn-left" @click="handleClick(1)">认识</text>
			<text class="btn btn-middle" @click="handleClick(0)">模糊</text>
			<!-- <text class="btn btn-right">不认识</text> -->
		</view>
	</view>
</template>

<script>
	import { getScheduleList, updateRecord } from '@/api/wordRoot'
	export default {
		data() {
			return {
				word: undefined
                    // {
						// "id": 2,"word":"2amphi","mean":"两个，两种两个，两种两个，两种",
                        // "detail":[
                        //     {
                        //     "word": "introduce",
                        //     "translate": "提出；介绍；引进；作为…的开头；"
                        //     },
                        // ],
                    // },
					,
				list: [],
				readyList: [],
				current: 0,
			}
		},
		computed: {
			remaindCount() {
				return this.readyList.filter(item => item.remaind).length
			},
			studyCount() {
				return this.list.filter(item => item.n == 1 && !item.remaind && !item.status).length
			}
		},
		created() {
			getScheduleList().then(response => {
				this.list = this.generatePlan(response.data)
				this.readyList = this.generateReadyList(response.data)
			})
		},
		methods: {
			handleClick(status) {
				updateRecord({
					id: this.readyList[0].id,
					status: status
				}).then(response => {
					this.updateWord(this.readyList[0], status)
				})
			},
			nextWord(index) {
				this.current = index;
				this.word = this.readyList[this.current];
			},
			updateWord(rtarget, status) {
				let index = -1;
				let target = undefined
				for (let i = 0; i < this.list.length; i++) {
					const element = this.list[i];
					if(element.id == rtarget.id) {
						index = i;
						target = element;
						break;
					}
				}
				if(index > -1) {
					// 设置词汇循环次数
					if(status) {
						target.n -= 1
					} else {
						target.n = 1
						target.remaind = true
					}
					this.list.splice(index, 1, target)
				}

				// 复习词汇记录
				if(!status) {
					this.readyList.splice(0, 1)
					this.readyList.push(target)
				} else {
					this.readyList.splice(0, 1)
				}
			},
			// 生成计划列表
			generatePlan(array) {
				let result = [];
				for (let i = 0; i < array.length; i++) {
					array[i]['n'] = 1;
					result.push(array[i]);
				}
				return result;
			},
			// 生成背词列表
			generateReadyList(array) {
				let result = [];
				for (let i = 0; i < array.length; i++) {
					array[i]['n'] = 1;
					if(array[i]['status'] == 0) {
						result.push(array[i]);
					}
				}
				return result;
			},
			// 返回
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
	.content-finish {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.option {
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding-bottom: 40px;
		.btn {
			@btnSize: 70px;
			border-radius: 10px;	
			width: @btnSize + 10px;
			height: @btnSize;
			text-align: center;
			line-height: @btnSize;
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
