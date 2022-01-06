<template>
    <view class="authorize-box">
		<view class="tips">登录后解锁更多功能 </view>
		<button type="default" size="mini" @click="getUserInfo">立即登录</button>
	</view>
</template>
<script>
export default {
    methods: {
        // 获取用户授权
        getUserInfo() {
            uni.getUserProfile({
                desc: '获取你的昵称、头像',
                success: res => {
                    console.log(res);
                    console.log(1);
                },
                fail: res => {
                    console.log(2);
                    console.log(res)
                    //拒绝授权
                    uni.showToast({
                        title: '登录失败',
                        icon: 'error',
                        duration: 2000
                    });
                    return;
                }
            });
        },
    },
}
</script>
<style lang="less" scoped>
.authorize-box {
	width: 100%;
	height: 40px;
	background: rgba(99, 90, 90, 0.5);
	display: flex;
	align-items: center;
	justify-content: space-around;
	.tips {
		color: #fff;
		font-size: 12px;
	}
	button {
		margin: 0;
		border-radius: 20px;
		text-align: center;
		border: 1px solid #86d461;
    	color: #86d461;
	}
}
</style>