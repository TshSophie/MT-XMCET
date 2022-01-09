<template>
    <view class="authorize-box" v-if="!authorized">
		<view class="tips">登录后解锁更多功能 </view>
		<button type="default" size="mini" @click="getUserInfo">立即登录</button>
	</view>
</template>
<script>
import { popAuthorizedWindow } from '@/utils/authorize'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            authorized: state => state.user.authorized,
        }),
    },
    methods: {
        // 获取用户授权
        getUserInfo() {
            // 触发授权弹窗
            popAuthorizedWindow()
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