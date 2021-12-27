<template>
	<view class="container">
		<view class="list">
			<view v-for="(item, index) in list" :key="item.id" class="card" @click="navigateToPostDetail(item)">
				<text class='card-title'>{{item.title}}</text>
				<text class='card-date'>{{item.createTime}}</text>
				<image :src='item.coverImg' mode='aspectFill' class='card-img'></image>
				<text class='card-desc'>{{item.desc?item.desc:''}}</text>
				<text class='card-read arrow' @click="navigateToPostDetail(item)">查看详情 </text>                   
			</view>
		</view>
		<view class="menu">
			<view class="menu-item" @click="navigateToPostList(1)">
				<span>语法</span>
			</view>
			<view class="menu-item" @click="navigateToPostList(2)">
				<span>作文</span>
			</view>
			<view class="menu-item" @click="navigateToPostList(3)">
				<span>词汇</span>
			</view>
			<view class="menu-item last" @click="navigateToPostList(4)">
				<span>听力</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						coverImg: "https://xmcet.oss-cn-shenzhen.aliyuncs.com/cover/20200508/ed401b9bf2e2fa52853b75b5cc0353c85c1b7e92.jpg",
						createTime: "2020-05-08 11:36:59",
						id: 30,
						title: "长对话核心情景词"
					},
					{
						coverImg: "https://xmcet.oss-cn-shenzhen.aliyuncs.com/cover/20200507/ff628f26174f9339f08d37bc51d625d263cc4025.jpg",
						createTime: "2020-05-07 23:23:52",
						id: 29,
						title: "四级翻译高频词之教育类"
					}
				],
				// 分页页面
				dataPage: 0,
				// 每页数据条数
				dataSize: 3,
				//推荐数据      
				hasMore: true,
			};
		},
		methods: {
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
			// 下拉刷新
			onPullDownRefresh() {
				console.log('refresh');
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000);
			}
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

}
</style>
