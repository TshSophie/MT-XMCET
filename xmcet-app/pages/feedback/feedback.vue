<template>
	<view class="form">
		<view class="form-item form-item-inline">
		 	<text class="title">反馈类型</text>	
			<picker class="picker" @change="bindPickerChangeType" v-model="typeIndex" :value="typeIndex" :range="typeArray">
				<view class="uni-input">{{typeArray[typeIndex]}}</view>
			</picker>
		</view>
		<view class="form-item form-item-inline">
			<text class="title">反馈内容</text>
			<picker class="picker" @change="bindPickerChangeTitle" v-model="titleIndex" :value="titleIndex" :range="titleArray">
				<view class="uni-input">{{titleArray[titleIndex]}}</view>
			</picker>
		</view>
		<view class="form-item">
			<textarea class="content" :maxlength="200" placeholder="请填写10个字以上的问题描述，以便我们提供更好的帮助" />
		</view>
		<view class="form-item">
			<text class="title">截图(0/4)</text>
			<Uploader class="uploader" :limit="4"/>
		</view>
		<view class="form-item form-item-inline">
		 <text class="title">联系方式</text>	
		 <input type="text"  placeholder="邮箱/手机号" />
		</view>
		<button type="primary" class="btn-submit">提交</button>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				functionExceptions: [
					"无法打开小程序",
					"小程序闪退",
					"卡顿",
					"黑屏白屏",
					"死机",
					"界面错位",
					"界面加载慢",
					"其他异常",
				],
				productionSuggestions: [
					'产品建议'
				],
				typeArray: [
					'功能异常',
					'产品建议'
				],
				titleArray: [],
				typeIndex: 0,
				titleIndex: 0,
			}
		},
		created() {
			this.titleArray = this.functionExceptions
		},
		methods: {
			bindPickerChangeType(event) {
				this.typeIndex = event.detail.value
				if(this.typeIndex) {
					this.titleArray = this.productionSuggestions
				} else {
					this.titleArray = this.functionExceptions					
				}
				this.titleIndex = 0

				console.log(event)
				console.log(this.typeIndex)

			},
			bindPickerChangeTitle(event) {
				console.log(event)
				this.titleIndex = event.detail.value

			}
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
		padding: 10px;
		.title {
			font-weight: bolder;
		}
		
		.uploader {
			margin: 5px;
		}
		&.form-item-inline {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			input, .picker{
				margin-left: 5px;
			}
		}
	}
	.btn-submit {
		margin-top: 80px;
	}
}
</style>
