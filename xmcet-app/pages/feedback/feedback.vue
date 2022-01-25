<template>
	<view class="form">
		<view class="form-item">
			<text class="title">标题</text>
		</view>
		<view class="form-item">
			<textarea class="content" :maxlength="200" placeholder="请填写10个字以上的问题描述，以便我们提高更好的帮助" />
		</view>
		<view class="form-item">
			<text class="title">截图(0/4)</text>
			<Uploader class="uploader" :limit="4"/>
		</view>
		<view class="form-item">
		 <text class="title">联系方式</text>	
		 <input type="text"  placeholder="邮箱/手机号" />
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>
page {
	background: #fff;
}
.form {
	padding: 10px;
	.form-item {
		border-bottom: 1px solid #4c424233;
		padding: 5px;
		.title {
			font-weight: bolder;
		}

		input {
			margin-top: 10px;
		}
		
		.uploader {
			margin: 5px;
		}
	}
}
</style>
