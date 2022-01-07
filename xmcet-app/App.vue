<script>
import { getToken } from '@/api/user'
export default {
	onLaunch: function() {
		// console.log('App Launch')
		// #ifdef  MP-WEIXIN	
			console.log("尝试登录...")
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					console.log(loginRes.code);
					getToken({code: loginRes.code}).then(response => {
						console.log(response)
						// 缓存token,和授权标记
						// wx.setStorageSync('authorized', response.data.authorized);
						// wx.setStorageSync('token', response.data.token);
						this.$store.commit('SET_AUTHORIZED', response.data.authorized)
						this.$store.commit('SET_TOKEN', response.data.token)
					})
				}
			});
		// #endif
	},
	onShow: function() {
		console.log('App Show')
	},
	
	onHide: function() {
		// console.log('App Hide')
	}
}
</script>

<style>
	@import "@/static/fonts/iconfont.css";
	/*每个页面公共css */
	page{
		background: #eeeeee;
	}
	/* 功能封装4：箭头  */
	.arrow{
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	}
	.arrow::after{
	    content: "";
	    width: 15rpx;
	    height: 15rpx;    
	    border-top: 3rpx solid #ccc;
	    border-right: 3rpx solid #ccc;
	    display: block;
	    transform: rotate(45deg);
	}
</style>
