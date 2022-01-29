<template>
	<view class="container">
		<view class="header">
			<view @click="navigateToForm" class="btn">
				<uni-icons type="compose" size="30"></uni-icons>
				<text>去填写～</text>
			</view>
		</view>
		<view class="list">
			<view class="row" v-for="item in list" :key="item.id">
				<view class="title">{{item.title}}</view>
				<view class="createTime">{{item.createTime}}</view>
				<view class="content">{{item.content}}</view>
				<view class="images">
					<image :src="img" v-for="img in item.images" :key="img" @click="previewImage(img, item.images)"></image>
				</view>
				<view class="link">联系方式：{{item.link}}</view>
				<view class="reply" v-if="item.reply">
					<view class="title">回复：</view>
					<view class="content">{{item.reply}}</view>
					<view class="updateTime">{{item.createTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getFeedback } from '@/api/feedback'
	import {
		config
	} from '@/config.js'
	export default {
		data() {
			return {
				serverDomain: config.server_domin,
				list: [
					// {
					// 	id: '1',
					// 	title: '无法打开小程序',
					// 	content: "H5 端，使用 aliasPath 页面作为启动页访问时，返回或再次进入页面会重新触发生命周期Bug (#316)",
					// 	link: 'fdsafa@qq.com',
					// 	images: [
					// 		'https://xmcet.oss-cn-shenzhen.aliyuncs.com/cover/20200507/66e2f0bec893478f23c91dda150066499e3cb947.jpg',
					// 		'https://xmcet.oss-cn-shenzhen.aliyuncs.com/cover/20200507/66e2f0bec893478f23c91dda150066499e3cb947.jpg',
					// 		'https://xmcet.oss-cn-shenzhen.aliyuncs.com/cover/20200507/66e2f0bec893478f23c91dda150066499e3cb947.jpg',
					// 		'https://xmcet.oss-cn-shenzhen.aliyuncs.com/cover/20200507/66e2f0bec893478f23c91dda150066499e3cb947.jpg',
					// 	],
					// 	createTime: '2022-01-29',
					// 	updateTime: '2022-01-29',
					// 	reply: 'ok',
					// },
				]
			};
		},
		created() {
			getFeedback().then(response => {
				let result = []
				response.data.forEach(element => {
					element.images = element.images.map(item => this.serverDomain + item)
					result.push(element)
				});
				this.list = result
			})
		},
		methods: {
			navigateToForm() {
				uni.navigateTo({
				    url: '/pages/feedback/feedback'
				});
			},
			previewImage(path, imageList) {
				let index = imageList.indexOf(path)
				// 预览图片
				uni.previewImage({
				    urls: imageList,
				    current: index,
					indicator: "number",
					loop: true
				});
			},
		}
	}
</script>

<style lang="less">
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 70px;
		width: 100%;
		background: #fff;

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 13px;
		}
	}
	.list {
		width: 100%;
		padding: 10px;

		.row {
			display: flex;
			flex-direction: column;
			background: #fff;
			border-radius: 10px;
			margin: 15px;
			padding: 5px;
			font-size: 14px;
			.createTime {
				font-size: 12px;
			}
			.title {
				font-weight: bolder;
			}
			.images image{
				width: 50px;
				height: 50px;
				margin: 3px;
			}
			.reply {
				display: flex;
				flex-direction: column;
				border-radius: 5px;
				padding: 10px;
				background: #eee;

				.updateTime {
					align-self: flex-end;
					font-size: 13px;
				}
			}
		}
	}
}
</style>
