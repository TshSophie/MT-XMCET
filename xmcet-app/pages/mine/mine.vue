<template>
	<view class="container">
		<view class="avatar center">    
			<image :src='userInfo.avatar?userInfo.avatar:unloginAvatar' class='avatarImg' @click='avatarBtn'>
			</image>
			<text class='nickName' v-if="authorized">{{userInfo.nickName}}</text>   
			<text class='nickName' v-else>请先登录</text>   
		</view>
		<view class="menu">
			<view class="row">
				<view class="menu-item" @click="navigateTo('/pages/collection/collection')">
					<image src='@/static/assets/menu/收藏.png' mod="aspectFit" class='icon'></image>
					<text>我的收藏</text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/userLike/userLike')">
					<image src='@/static/assets/menu/点赞.png' mod="aspectFit" class='icon'></image>
					<text>我的点赞</text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/subscribe/subscribe')">
					<image src='@/static/assets/menu/订阅.png' mod="aspectFit" class='icon'></image>
					<text>我的订阅</text>
				</view>
			</view>

			<view class="col"> 
				<view class="menu-item" @click="navigateTo('/pages/updateLog/updateLog')"> 
					<image src='@/static/assets/menu/日志.png' mod="aspectFit" class='icon'></image>
					<text>更新日志</text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/feedback/feedback')"> 
					<image src='@/static/assets/menu/用户反馈.png' mod="aspectFit" class='icon'></image>
					<text>建议反馈</text>
				</view>
				<view class="menu-item"> 
					<image src='@/static/assets/menu/关于我们.png' mod="aspectFit" class='icon'></image>
					<text>关于</text>
				</view>
			</view>
		</view>
		<view class="copy-right">@小麦CET</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getUserInfo } from '@/api/user'
	import { popAuthorizedWindow } from '@/utils/authorize'
	export default {
		data() {
			return {
				unloginAvatar: require('@/static/assets/unlogin-avatar.png'),
				cet4Process: 0,
				cet6Process: 0,
				wordMasteredCount:0, // 词根词缀掌握个数
			};
		},
		computed: {
			...mapState({
				authorized: state => state.user.authorized,
				userInfo: state => state.user.userInfo,
			}),
		},
		created() {
			if(this.authorized) {
				this.getUserInfo()
			}
		},
		methods: {
			avatarBtn() {
				// 未授权，触发授权弹窗
				if(!this.authorized) {
					// 触发授权弹窗
					popAuthorizedWindow((res) => {
						if(res) {
							this.getUserInfo()
						}
					})
				}
			},
			getUserInfo() {
				getUserInfo().then(response => {
					console.log(response)
					if(response.code == 200) {
						// 更新用户信息
						this.$store.commit('SET_USER_INFO', response.data)
						console.log(this.$store.state)
					}
				})
			},
			navigateTo(target) {
				uni.navigateTo({
				    url: target
				});
			}
		}
	}
</script>

<style lang="less">
.container {
	background: #fff;
	
	.avatar{
		height: 400rpx;   
		width: 100%;    
		position: relative;   
		background: #86d461;
		border-bottom-left-radius: 35%;    
	}

	.avatar .avatarImg{
		background: #fff;
		position: absolute;  
		border: 8rpx solid #fff;  
		width: 175rpx;
		height: 175rpx;    
		border-radius: 50%;    
	}

	.avatar-btn{
		position: relative;
		margin: 0;
		padding: 0;      
		width: 190rpx;
		height: 190rpx;    
		display: flex;
		display: -webkit-flex; 
		justify-content: center;
		-webkit-justify-content: center;
		align-items:center;
		-webkit-align-items: center;
	}

	.nickName{
		position: absolute;
		height: 30rpx;
		bottom: 60rpx; 
		font-size: 30rpx;
	}
	.menu {
		display: flex;
		flex-direction: column;
		padding: 10px;
		.row {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin-bottom: 10px;
			.menu-item {
				margin: 5px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.icon {
					width: 40px;
					height: 40px;
				}
				text {
					margin-top: 3px;
					font-size: 13px;
				}
			}
		}
		.col {
			margin-top: 15px;
			display: flex;
			flex-direction: column;
			.menu-item {
				width: 100%;
				margin: 10px 0;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;

				.icon {
					margin-left: 10px;
					width: 35px;
					height: 35px;
				}
				text {
					flex: 1;
					margin-left: 15px;
					font-size: 14px;
				}

				&::after{
					content: "";
					width: 15rpx;
					height: 15rpx;    
					border-top: 3rpx solid #ccc;
					border-right: 3rpx solid #ccc;
					display: block;
					transform: rotate(45deg);
				}
			}
		}
	}

	.copy-right {
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		width: 100%;
		margin-bottom: 5px;
		text-align: center;
		font-size: 13px;
	}
}



</style>
