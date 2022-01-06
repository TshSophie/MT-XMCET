<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			console.log("尝试登录...")
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					console.log(loginRes.code);
				}
			});
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
