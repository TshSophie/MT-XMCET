<template>
	<view class="container">
		<AuthorizeBar class="authorize-bar"/>
		<view class="header">
			<h2>#我的订阅</h2>
		</view>
		<view class="content">
			<view class="operation">
				<text> {{total}}个内容 </text>
				<view v-if="order==0" @click="handleChangeOrder(1)">
					<uni-icons custom-prefix="iconfont" type="icon-zhengxu" size="20"></uni-icons>
					<text>正序</text>
				</view>
				<view v-else @click="handleChangeOrder(0)">
					<uni-icons custom-prefix="iconfont" type="icon-daoxu" size="20"></uni-icons>
					<text>倒序</text>
				</view>
			</view>
			<view class="list">
				<uni-swipe-action>
					<uni-swipe-action-item 
					v-for="item in list" 
					:key="item.id" 
					:right-options="options" 
					@click="onClick(item)">
						<view class='item-row' @click="navigateToDetail(item)">
							<view class="item-content">
								<view class="item-title">
									{{item.title}}
								</view>
								<view class="item-desc">
									{{item.desc}}
								</view>
								<span class="item-info">{{formatTime(item.createTime)}}</span>
							</view>
							<image :src='item.coverImg' class="item-image"></image>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	import { getSubscribeArticleCategoryList, subscribeArticleCategory } from '@/api/article'
	export default {
		data() {
			return {
				list: [
					// {
					// 	id: 1,
					// 	articleId: 1,
					// 	title: "xxxxxx1",
					// 	coverImg: require("static/assets/function03.png")
					// },
				],
				// 分页页面
				dataPage: 0,
				// 每页数据条数
				dataSize: 10,
				//推荐数据      
				hasMore: true,
				total: 0,
				// 正序
				order: 0,
				options:[
					{
						text: '取消',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		onLoad() {
        	uni.startPullDownRefresh();
			this.getList()
		},
		// 触底
		onReachBottom() {
			if(this.hasMore) {
				this.getList();
			} else {
				uni.showToast({
					title: '没有更多了',
					icon: 'none',
					duration: 1000
				});
				uni.stopPullDownRefresh();
			}
		},
		methods: {
			getList(refresh) {
				if(refresh) {
					this.dataPage = 0
					this.list = []
				}
				// 页码加1
				++this.dataPage;
				// 加载推荐数据
				let param = {
					pageNum: this.dataPage,
					pageSize: this.dataSize,
					order: this.order
				}
				// 请求列表数据
				getSubscribeArticleCategoryList(param).then((res) => {
					// 将数据逆序排列
					let resData = res.data.rows.reverse()      
					// 拼接达到数据的累加
					const data = resData.concat(this.list)
					// 判断是否还有数据
					const hasMore = this.dataPage * this.dataSize < (res.data.total - 0)
					this.list = data
					this.hasMore = hasMore
					this.total = res.data.total
					uni.stopPullDownRefresh()
				})
			},
			// 正序、倒序切换事件
			handleChangeOrder(order) {
				this.order = order
				this.dataPage = 0
				this.list = []
				this.getList()
			},
			// 跳转详情页
			navigateToDetail(item) {
				uni.navigateTo({
				    url: '/pages/postList/postList?menuId=' + item.categoryId
				});
			},
			onClick(item){
				// 取消
				subscribeArticleCategory({
					id: item.categoryId,
					status: 0
				}).then(response => {
					console.log(response)
					this.getList(true)
				})
			},
		},
	}
</script>

<style lang="less">
.container {
	.header {
		padding: 30px 20px;
		display: flex;
		justify-content: space-around;
	}
	.content {
		background: #fff;
		border-radius: 10px;
		.operation {
			display: flex;
			justify-content: space-between;
			padding: 15px;
			text {
				font-size: 14px;
    			color: rgba(0,0,0,0.5);
			}
			view {
				font-size: 15px;
				margin-left: 5px;
			}
		}
		.list {
		  display: flex;
		  flex-direction: column;    
		  font-size: 30rpx;
		  
		  .item-row {
			display: flex; 
			border-top: 1rpx dotted rgb(230, 222, 222);
			flex-direction: row; 
			justify-content: space-between;  
			align-items: center; -webkit-align-items: center;
			align-content: center;  
			padding: 16px;
    		min-height: 64px;
			position: relative;
    		cursor: pointer;
			.item-content {
				    margin-bottom: 4px;
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					flex: 1;
					position: relative;
					height: 100%;
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-box-orient: vertical;
					-webkit-box-direction: normal;
					-webkit-flex-direction: column;
					flex-direction: column;
					-webkit-box-pack: end;
					-webkit-justify-content: flex-end;
					justify-content: flex-end;
					overflow: visible;
					
					.item-title {
						font-size: 32rpx;
						font-weight: bold;
						line-height: 1.4;
						overflow: hidden;
					}
					.item-desc {
						font-size: 14px;
						margin: 5px 0;
					}
					.item-info {
						font-size: 14px;
						color: rgba(0,0,0,0.3);
						line-height: 20px;
					}
			}
			.item-image{
				width: 64px;
				height: 64px;
				border-radius: 1px;
				background-size: cover;
				background-position: center;
				margin: 4px 0 4px 12px;
			}
		  }
		}
		.load-more {
			width: 100%;
			height: 30px;
		}
	}
	.authorize-bar {
		position: fixed;
		z-index: 9999;
		bottom: var(--window-bottom);
		left: 0;
		width: 100%;
	}
}
</style>
