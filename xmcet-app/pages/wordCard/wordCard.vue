<template>
	<view class="container">
		<span class="close" @click="handleBack">x</span>
		<view class="header"> 
			学习{{studyCount}}|复习{{remaindCount}}
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
				word: 
                    {
						// "id": 2,"word":"2amphi","mean":"两个，两种两个，两种两个，两种",
                        // "detail":[
                        //     {
                        //     "word": "introduce",
                        //     "translate": "提出；介绍；引进；作为…的开头；"
                        //     },
                        // ],
                    },
				list: [],
				readyList: [],
				current: -1
			}
		},
		computed: {
			remaindCount() {
				return this.list.filter(item => item.n > 1 && !item.status).length
			},
			studyCount() {
				return this.list.filter(item => item.n == 1 && !item.status).length
			}
		},
		created() {
			getScheduleList().then(response => {
				this.list = this.generatePlan(response.data)
				this.readyList = this.generateReadyList(response.data)
				this.nextWord()
			})
		},
		methods: {
			handleClick(status) {
				updateRecord({
					id: this.word.id,
					status: status
				}).then(response => {
					this.updateWord(this.word.id, status)
				})
			},
			nextWord() {
				this.current++
				if(this.current > this.readyList.length) {
					this.current = this.current % this.readyList.length
				}
				this.word = this.readyList[this.current]
			},
			updateWord(id, status) {
				let index = this.list.findIndex((item)=>{
					return item.id == id
				})
				let target = this.list.find(item => {
					return item.id == id
				})
				if(index > -1) {
					if(status) {
						target.n -= 1
					} else {
						target.n += 1
					}
					this.list.splice(index, 1, target)
					console.log(this.list)
					let rindex = this.readyList.findIndex(item => {
						return item.id == id
					})
					let rtarget = this.readyList.find(item => {
						return item.id = id
					})
					if(target.n == 0) {
						this.readyList.splice(rindex, 1)
					} else {
						this.readyList.push(rtarget)
					}
				}
				this.nextWord()
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
