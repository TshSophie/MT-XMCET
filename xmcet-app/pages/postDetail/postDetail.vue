<template>
	<view class="article">
		<view class='header'>
			<view class='title'>
				{{article.title}}
			</view>
			<view class='header-bottom'>
				<view class='author'>
					{{article.author}}
				</view>
				<view class='date'>
					{{article.createTime}}
				</view>         
			</view>  
			<view class='from'>
				来源：{{article.copyfrom?article.copyfrom:'原创'}}
			</view>      
		</view>
		<view class='content'>
			<rich-text :nodes="article.content"></rich-text>
		</view>
		<view class='option'>
			<span @click="handleShare">
				<uni-icons type="paperplane" size="20" color="#576b95"></uni-icons>
				分享
				<button open-type="share" class="shareBtn"/>
			</span>
			<span @click="handleCollect">
				<uni-icons :type="collectStatus?'heart-filled':'heart'" size="20" color="#576b95"></uni-icons>
				收藏
			</span>
			<span @click="handleThumbsUp">
				<uni-icons :type="likeStatus?'hand-up-filled':'hand-up'" size="20" color="#576b95"></uni-icons>
				赞 {{article.likeCount}}
			</span>
			<span class="read-count">
				阅读 {{article.read}}
			</span>
		</view>
		
	</view>
</template>

<script>
	import {getArticleDetail, likeArticle, collectArticle} from '@/api/article'
	export default {
		data() {
			return {
				id: '',
				article: {
					// id: 28,
					// copyfrom: "",
					// createTime: "2020-05-07 23:18:44",
					// authorName: "小麦CET",
					// title: "四级翻译高频词之文化类",
					// content: ''
				},
				likeStatus: false,
				collectStatus: false
			};
		},
		mounted() {
			// #ifndef  APP-PLUS || H5
			// uni.showShareMenu({
			// 	withShareTicket: true,
			// 	title: "小麦CET《xx文章》",
			// 	content: "ddddddddddddddddd",
			// 	path: '/pages/postDetail/postDetail?id=' + 12
			// })
			// #endif
			
		},
		onLoad(options) {
			this.id = options.id
			getArticleDetail({id: options.id}).then(response => {
				this.article = response.data
				this.likeStatus = response.data.likeStatus
				this.collectStatus = response.data.collectStatus
			})
		},
		methods: {
			// 分享
			handleShare() {
				 
			},
			// 收藏
			handleCollect() {
				this.collectStatus = !this.collectStatus
				collectArticle({
					id: this.id,
					status: this.collectStatus + 0
				}).then(response => {
					console.log(response)
				})
			},
			// 点赞
			handleThumbsUp() {
				this.likeStatus = !this.likeStatus
				likeArticle({
					id: this.id,
					status: this.likeStatus + 0
				}).then(response => {
					console.log(response)
					if(this.likeStatus) {
						this.article.likeCount += 1;
					} else {
						this.article.likeCount -= 1;						
					}
				})
			},
			handleBack() {
				uni.navigateBack({
					delta: 1
				});
			}

		},
	}
</script>

<style lang="less">
.article{
  background: white;
  width: 100%;
  border-radius: 10rpx;
	.header{
		padding:30rpx;
		font-size:40rpx;
		display:flex;
		flex-direction:column;  
		.header-bottom{
			margin-top:10rpx;
			font-size:25rpx;
			display:flex;
			display: -webkit-flex; 
			flex-direction:row;
			color:rgb(99,87,87);
			.date{
				margin-left:20rpx;
			}
		}
		.from{
			margin-top:10rpx;
			font-size:25rpx;
			display:flex;
			display: -webkit-flex; 
			flex-direction:row;
			color:rgb(99,87,87);
		}
	}
	
	.content{
		padding: 10px;
		font-size:35rpx;
	}
	.option {
		color: #576b95;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 13px;
		padding: 10px;
		padding-bottom: 30px;
		span {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 5px;

			.shareBtn {
				position: absolute;
			}

			&.read-count {
				color: #7e7676;
			}
		}
	}
}
</style>
