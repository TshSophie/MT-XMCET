<template>
	<view class="container">
		<view class="header">
			<h2>#我是标题</h2>
			<button type="primary" size="mini">订阅</button>
		</view>
		<view class="content">
			<view class="operation">
				<text> 360个内容 </text>
				<view>
					<uni-icons custom-prefix="iconfont" type="icon-zhengxu" size="20"></uni-icons>
					<text>正序</text>
				</view>
			</view>
			<view class="list">
				<view class='item-row' v-for="item in article" :key="item.id">
					<view class="item-content">
						<view class="item-title">
							{{item.title}}
						</view>
						<span class="item-info">今天</span>
					</view>
					<image :src='item.cover_img' class="item-image"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: [
					{
						id: 1,
						title: "xxxxxx1",
						cover_img: require("static/assets/function03.png")
					},
					{
						id: 2,
						title: "xxxxxx1",
						cover_img: require("static/assets/function03.png")
					},
					{
						id: 3,
						title: "xxxxxx1",
						cover_img: require("static/assets/function03.png")
					},
					{
						id: 4,
						title: "xxxxxx1",
						cover_img: require("static/assets/function03.png")
					},
					{
						id: 5,
						title: "xxxxxx1",
						cover_img: require("static/assets/function03.png")
					},
					{
						id: 6,
						title: "xxxxxx1",
						cover_img: require("static/assets/function03.png")
					},
				]
			};
		}
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
	}
}
</style>
