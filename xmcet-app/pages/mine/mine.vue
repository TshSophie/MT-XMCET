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
				<view class="menu-item"> 
					<image src='@/static/assets/menu/收藏.png' mod="aspectFit" class='icon'></image>
					<text>我的收藏</text>
				</view>
				<view class="menu-item"> 
					<image src='@/static/assets/menu/点赞.png' mod="aspectFit" class='icon'></image>
					<text>我的点赞</text>
				</view>
				<view class="menu-item"> 
					<image src='@/static/assets/menu/订阅.png' mod="aspectFit" class='icon'></image>
					<text>我的订阅</text>
				</view>
			</view>
			<view class="row"> 
				<view class="menu-item"> 
					<image src='@/static/assets/menu/日志.png' mod="aspectFit" class='icon'></image>
					<text>更新日志</text>
				</view>
				<view class="menu-item"> 
					<image src='@/static/assets/menu/用户反馈.png' mod="aspectFit" class='icon'></image>
					<text>建议反馈</text>
				</view>
				<view class="menu-item"> 
					<image src='@/static/assets/menu/关于我们.png' mod="aspectFit" class='icon'></image>
					<text>关于</text>
				</view>
			</view>
		</view>
		<!-- <view class='divider'></view> -->
<!-- 
		<view class='cell'>
			<navigator class='cell-item arrow' open-type="redirect" url='/pages/courselist/courselist?cateId=1'>
				<image src='@/static/assets/process4.png' mod="aspectFit" class='functionPartIcon'></image>
				<text>四级闯关进度：{{cet4Process}}% </text>
			</navigator>
			<navigator class='cell-item arrow' open-type="redirect" url="/pages/courselist/courselist?cateId=2">
				<image src='@/static/assets/process6.png' mod="aspectFit" class='functionPartIcon'></image>
				<text>六级闯关进度：{{cet6Process}}%</text>
			</navigator>    
			<navigator class='cell-item arrow' open-type="redirect" url="/pages/wordlist/wordlist">
				<image src='@/static/assets/cigen.png' mod="aspectFit" class='functionPartIcon'></image>
				<text>词根词缀掌握个数： {{wordMasteredCount}}</text>
			</navigator>     
			<navigator class='cell-item arrow' open-type="redirect" url='/pages/articleList/articleList'>
				<image src='@/static/assets/reading.png' mod="aspectFit" class='functionPartIcon'></image>
				<text>阅读文章，压压惊</text>
			</navigator>
			<navigator class='cell-item arrow' url='/pages/about/about'>
				<image src='@/static/assets/about.png' mod="aspectFit" class='functionPartIcon'></image>
				<text>关于小麦英语CET</text>
			</navigator>
		</view>  
-->
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
			}
		}
	}
</script>

<style lang="less">
.container {
	background: #fff;

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
					font-size: 13px;
				}
			}
		}
	}
}
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

.cell-item{
    position: relative;
    border-bottom: 1rpx solid #ddd;
    padding: 20rpx 30rpx;
    height: 60rpx;    
}
.cell-item text{
    margin-left: 120rpx;
}

</style>
