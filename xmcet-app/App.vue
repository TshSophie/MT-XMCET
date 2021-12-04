<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
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
