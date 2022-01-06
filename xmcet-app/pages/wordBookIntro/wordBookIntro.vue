<template>
	<view class="page">
		<AuthorizeBar class="authorize-bar"/>

		<TabsUd v-model="currentTab" @tab-click="handleClick" :tabs="tabs"></TabsUd>
		<view class="book">
			<image class="book-cover" src="/static/assets/function01.png">
			<view class="book-detail">
				<view class="line1"> 
					<text class="title">词根词缀</text>
					<text class="btn" @click="open">调整计划</text>
				</view>
				<view class="line2">每日20词，剩余20天</view>
				<view class='progress-box line3'>                        
					<progress percent="20" show-info stroke-width="4" activeColor="#86d461"/>
					<view> 
						<text>已学词汇</text>
						<text>20/209</text>
					</view>
				</view>
			</view>
		</view>
		<view class="plan">
			<h3 class="title">今日计划</h3>
			<view class="charts-box">
				<qiun-data-charts
					type="arcbar"
					:chartData="chartData"
					:canvas2d="true"
					background="none"
					:opts="{
					title:{name:'0%',color:'#2fc25b',fontSize:35},
					subtitle:{name:'进度',color:'#666666',fontSize:25}}" 
				/>
			</view>
			<button type="primary" class="btn" @click="handleStart" style="margin-top: 20px">开始闯关</button>
		</view>
		<uni-popup ref="popup" type="dialog">
			<view class="dialog">
				<view class="title">闯关计划</view>
				<view class="input">
					<text>
						每日最大学习量
					</text>
					<uni-number-box v-model="dailyCount" :min="10" :step="10"></uni-number-box>
				</view>
				<view class="content">
					<span class="close" @click="close">x</span>
					<view class="item">
						<text class="title">当前任务量</text>
						<text class="value">1797词</text>
					</view>
					<view class="item">
						<text class="title">预计完成周期</text>
						<text class="value">173天</text>
					</view>
					<view class="item">
						<text class="title">已坚持</text>
						<text class="value">3天</text>
					</view>
				</view>
				<button type="primary" @click="submitPlan">确认</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import TabsUd from '@/components/TabsUd'
	export default {
		components: {
			TabsUd
		},
		data() {
			return {
				bookInfo: {},
				currentTab: -1,
				tabs:[
                    {u: "全部", d: "120"},
                    {u: "记忆中", d: "2"},
                    {u: "陌生词", d: "128"},
                    {u: "已掌握", d: "0"},
                ],
				chartData:{
					series:[
						{
							"name": "正确率",
							"data": 0.0,
							"color": "#2fc25b"
						},
					],
				},
				dailyCount: 10
			}
		},
		methods: {
			handleClick(item) {
				this.currentTab = item
				// 跳转到词汇列表页面
				uni.navigateTo({
				    url: '/pages/wordList/wordList?type=' + item + '&id=' + this.bookInfo.id
				});
			},
			handleStart() {
				// 跳转到词汇闯关页面
				uni.navigateTo({
				    url: '/pages/wordCard/wordCard'
				});
			},
			submitPlan() {
				console.log(this.dailyCount)
			},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open()
			},
			close() {
				this.dailyCount = 10
				this.$refs.popup.close()
			},
		}
	}
</script>

<style lang="less" scoped>
.page {
	.book {
		display: flex;
		justify-content: row;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid #fff;
		margin: 5px;
		.book-cover {
			width: 40px;
			height: 50px;
		}
		.book-detail {
			padding: 5px;
			flex: 1;
			font-size: 12px;
            
			.line1 {
				display: flex;
				justify-content: space-between;
				.title {
					font-size: 16px;
					font-weight: bolder;
				}
				.btn {
					cursor: pointer;
					padding: 5px;
					border-radius: 5px;
					border: 1px dotted #007afe;
				}
			}
			.line2 {
				margin: 5px 0;
			}
			.line3 {
				view {
					display: flex;
					justify-content: space-between;
				}
			}	
		}
	}
	.plan {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.title {
			align-self: flex-start;
			margin: 10px;

		}
		.charts-box {
			// width: 60%;
		}
		.btn {
			width: 80%;
		}
	}
	.dialog {
		.close {
			font-size: 20px;
			font-weight: bolder;
			position: absolute;
			right: 15px;
			top: 5px;
		}
		box-sizing: border-box;
		width: 300px;
		// height: 400px;
		background: #fff;
		padding: 30px;
		.title {
			text-align: center;
			font-size: 16px;
			font-weight: bolder;
		}
		.input {
			font-size: 15px;
			font-weight: bolder;
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
		}
		.content {
			margin: 20px 0;
			display: flex;
			flex-direction: column;

			.item {
				display: flex;
				justify-content: space-between;

				.title {
					font-size: 14px;
					font-weight: normal;
				}
			}
		}
	}
}
</style>
