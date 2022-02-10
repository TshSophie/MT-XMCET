<template>
	<view class="container">
		<AuthorizeBar class="authorize-bar"/>
		<view class="header">
			<view class="top"> 
				<image :src="category.coverImg" class="cover"></image>
				<h2 class="title">#{{category.name}}</h2>
				<button :type="!subscribeStatus?'primary':'default'" :plain="true" size="mini" @click="handleSubscribe" >{{subscribeStatus?'已订阅':'订 阅'}}</button>
			</view>
			<view class="desc">
				{{category.desc}}
			</view>
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
				<view class='item-row' v-for="item in list" :key="item.id" @click="navigateToPostDetail(item)">
					<view class="item-content">
						<view class="item-title">
							{{item.title}}
						</view>
						<span class="item-info">{{formatTime(item.createTime)}}</span>
					</view>
					<image :src='item.coverImg' class="item-image"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getArticleListByCategory, subscribeArticleCategory } from '@/api/article'
	export default {
		data() {
			return {
				list: [
					// {
					// 	id: 1,
					// 	title: "xxxxxx1",
					// 	coverImg: require("static/assets/function03.png")
					// },					
				],
				category: {
					name: ''
				},
				menuId: '',
				// 分页页面
				dataPage: 0,
				// 每页数据条数
				dataSize: 10,
				//推荐数据      
				hasMore: true,
				total: 0,
				// 正序
				order: 0,
				// 订阅状态
				subscribeStatus: false
			};
		},
		onLoad(options) {
        	uni.startPullDownRefresh();
			this.menuId = options.menuId
			this.getList()
		},
		// 触底
		onReachBottom() {
			console.log("fjdsihfosih")
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
			getList() {
				// 页码加1
				++this.dataPage;
				// 加载推荐数据
				var param = {
					pageNum: this.dataPage,
					pageSize: this.dataSize,
					id: this.menuId,
					order: this.order
				}
				// 请求列表数据
				getArticleListByCategory(param).then((res) => {
					this.category = res.data.category
					this.subscribeStatus = res.data.category.subscribeStatus
					// 将数据逆序排列
					let resData = res.data.rows.reverse()      
					//拼接达到数据的累加
					const data = resData.concat(this.list)
					//console.log(res.header)  //在响应头中X-Total-Count代表数据总数
					//判断是否还有数据
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
			// 订阅
			handleSubscribe() {
				this.subscribeStatus = !this.subscribeStatus
				subscribeArticleCategory({
					id: this.menuId,
					status: this.subscribeStatus + 0
				}).then(response => {
					console.log(response)
					if(this.subscribeStatus) {
						this.article.likeCount += 1;
					} else {
						this.article.likeCount -= 1;						
					}
				})
			},
			// 跳转文章详情页
			navigateToPostDetail(item) {
				uni.navigateTo({
				    url: '/pages/postDetail/postDetail?id=' + item.id
				});
			},
		},
	}
</script>

<style lang="less">
.container {
	.header {
		padding: 30px 20px;
		.top {
			display: flex;
			justify-content: space-around;
			align-items: center;
			.cover {
				width: 50px;
				height: 60px;
			}
			.title {
				margin-left: 5px;
			}
		}
		.desc {
			margin-top: 15px;
			font-size: 13px;
		}
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
						height: calc(2 * 1.4em);
						overflow: hidden;
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
