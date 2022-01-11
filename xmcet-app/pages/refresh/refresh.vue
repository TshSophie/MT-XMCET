<template>
	<view class="container">
		<h3>登录状态失效...</h3>
		<button size="mini" :plain="true" type="primary" @click="back">重新登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				from: ''
			}
		},
		onLoad(options) {
			this.from= '/' + decodeURIComponent(options.from)
			// this.back()
		},
		methods: {
			back() {
				console.log(this.from)
				uni.redirectTo({
					url: this.from
				})
			}
		}
	}
</script>

<style lang="less">
.container {
	font-size: 14px;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* margin-top: 100px; */
	button {
		margin: 15px;
	}
}
</style>
