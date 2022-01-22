<template>
	<view class="container">
		<!-- S 文章列表 -->
		<view class="list">
			<view v-for="item in list" :key="item.id" class="card" @click="navigateToPostDetail(item)">
				<text class='card-title'>{{item.title}}</text>
				<text class='card-date'>{{formatTime(item.createTime)}}</text>
				<image :src='item.coverImg' mode='aspectFill' class='card-img'></image>
				<text class='card-desc'>{{item.desc?item.desc:''}}</text>
				<text class='card-read arrow' @click="navigateToPostDetail(item)">查看详情 </text>                   
			</view>
		</view>
		<!-- E 文章列表 -->

		<!-- S 分类栏 -->
		<view class="menu">
			<view class="menu-item" v-for="item in categoryList" :key="item.id" @click="navigateToPostList(item.id)">
				<span>{{item.name}}</span>
			</view>
		</view>
		<!-- E 分类栏 -->

		<!-- 授权条 -->
		<AuthorizeBar class="authorize-bar"/>
	</view>
</template>

<script>
	import { getArticleCategory, getArticleList } from '@/api/article'
	export default {
		data() {
			return {
				list: [
					// {
					// 	coverImg: "https://xmcet.oss-cn-shenzhen.aliyuncs.com/cover/20200508/ed401b9bf2e2fa52853b75b5cc0353c85c1b7e92.jpg",
					// 	createTime: "2020-05-08 11:36:59",
					// 	id: 30,
					// 	title: "长对话核心情景词"
					// },
				],
				// 分页页面
				dataPage: 0,
				// 每页数据条数
				dataSize: 3,
				//推荐数据      
				hasMore: true,
				// 分类列表
				categoryList: []
			};
		},
		onLoad() {			
        	uni.startPullDownRefresh();
			getArticleCategory().then(response => {
				this.categoryList = response.data
			})
		},
		onPullDownRefresh() {
			console.log('refresh');
			if(this.hasMore) {
				this.getList();
			} else {
				uni.showToast({
					title: '没有更多了',
					icon: 'none',
					duration: 2000
				});
				uni.stopPullDownRefresh();
			}
		},
		methods: {  
			getList() {
				console.log(this.hasMore)
				// 页码加1
				++this.dataPage;
				// 加载推荐数据
				var param = {
					pageNum: this.dataPage,
					pageSize: this.dataSize
				}
				//判断是否还有更多数据
				if (this.hasMore){
					// 请求列表数据
					getArticleList(param).then((res) => { 
						console.log(res)
						// 将数据逆序排列
						let resData = res.data.rows.reverse()      
						//拼接达到数据的累加
						const recommends = resData.concat(this.list)
						//console.log(res.header)  //在响应头中X-Total-Count代表数据总数
						//判断是否还有数据
						const hasMore = this.dataPage * this.dataSize < (res.data.total - 0)
						this.list = recommends
						this.hasMore = hasMore
						uni.stopPullDownRefresh();
					})
				}
			},
			navigateToPostDetail(item) {
				uni.navigateTo({
				    url: '/pages/postDetail/postDetail?id=' + item.id
				});
			},
			navigateToPostList(menuType) {
				uni.navigateTo({
				    url: '/pages/postList/postList?menuId=' + menuType
				});
			},
		},
	}
</script>

<style lang="less">
.container {
	@bottomMenuHeight: 65px;
	height: calc(100vh - var(--window-top));
	box-sizing: border-box;
	position: relative;
	display: flex;
	flex-direction: column;
	.list {
		height: calc(100% - @bottomMenuHeight);
		overflow-y: scroll;
		.card{
			background-color: #fff;
			border: 1rpx solid #ddd;
			border-radius: 20rpx;
			margin: 60rpx 20rpx;
			padding: 20rpx 25rpx;
			display: flex;
			flex-direction: column;
			.card-title{
				font-size: 20px;
				margin-bottom: 20rpx;
			}
			.card-date{
				font-size: 14px;
				color: #999;
				border-bottom: 1rpx solid #ddd;
				margin-bottom: 20rpx;
				padding-bottom: 20rpx;
			}
			.card-img{
				width: 100%;
				height:300rpx;
			}
			.card-desc{
				font-size: 16px;
				color: #333;
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #ddd;
				margin: 20rpx 0;
			}
			.card-read{
				font-size: 14px;
				color: #666;
			}
		}
	}
	.menu {
		position: absolute;
		bottom: 0;
		left: 0;
		height: @bottomMenuHeight;
		width: 100%;
		border-top: 1px #ddd solid;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		box-shadow: 13px -2px 4px 1px rgb(223 224 225 / 60%);
		.menu-item {
			box-sizing: border-box;
			height: 100%;
			width: 25%;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			padding-top: 10px;
			span {
				text-align: center;
				width: 100%;
				border-right: 1px solid #ddd;
			}
			
			&.last span{
				border-right: 0;
			}
		}
	}
	.authorize-bar {
		position: fixed;
		top: var(--window-top);
		// top: var(--window-bottom);
		left: 0;
		width: 100%;
		height: 40px;
	}
}
</style>
