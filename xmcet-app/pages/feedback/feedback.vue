<template>
	<view class="form">
		<view class="form-item form-item-inline">
		 	<text class="title">反馈类型</text>	
			<picker class="picker" @change="bindPickerChangeType" v-model="form.type" :value="form.type" :range="typeArray">
				<view class="uni-input">{{typeArray[form.type]}}</view>
			</picker>
		</view>
		<view class="form-item form-item-inline">
			<text class="title">反馈内容</text>
			<picker class="picker" @change="bindPickerChangeTitle" v-model="form.title" :value="form.title" :range="titleArray">
				<view class="uni-input">{{titleArray[form.title]}}</view>
			</picker>
		</view>
		<view class="form-item">
			<textarea class="content" v-model="form.content" :maxlength="200" placeholder="请填写10个字以上的问题描述，以便我们提供更好的帮助" />
		</view>
		<view class="form-item">
			<text class="title">截图(0/4)</text>
			<Uploader class="uploader" :limit="4" @handleChoose="handleChoose" v-model="form.images"/>
		</view>
		<view class="form-item form-item-inline">
		 <text class="title">联系方式</text>
		 <input type="text" v-model="form.link" placeholder="邮箱/手机号" />
		</view>
		<button type="primary" class="btn-submit" @click="submitForm">提交</button>
	</view>
</template>

<script>
	import { postFeedback } from '@/api/feedback'
	import { uploadFile } from '@/utils/request'
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
				form: {}
			}
		},
		created() {
			this.reset()
			this.titleArray = this.functionExceptions
		},
		methods: {
			reset() {
				this.form = {
					type: 0,
					title: 0,
					content: '',
					images: [],
					link: ''
				}
			},
			async submitForm() {
				console.log(this.form)
				let uploads = []
				for(let i = 0; i < this.form.images.length; i++) {
					// 上传文件后
					let ret = await uploadFile(
						'upload/feedbackImage',
						this.form.images[i]['path']
					);
					uploads.push(ret.data.imgUrl)
				}
				console.log(uploads)
				postFeedback({
					title: this.titleArray[this.form.title],
					type: this.form.type,
					content: this.form.content,
					link: this.form.link,
					images: uploads.toString(),
				}).then(response => {
					console.log(response)
					uni.showToast({
						title: '提交成功',
						duration: 2000,
						icon: 'success'
					});
				})
			},
			handleChoose(e) {
				console.log(e)
				console.log(this.form)
			},
			bindPickerChangeType(event) {
				this.form.type = event.detail.value
				if(this.form.type) {
					this.titleArray = this.productionSuggestions
				} else {
					this.titleArray = this.functionExceptions					
				}
				this.form.title = 0

				console.log(event)
				console.log(this.form.type)

			},
			bindPickerChangeTitle(event) {
				console.log(event)
				this.form.title = event.detail.value

			}
		}
	}
</script>

<style lang="less" scoped>
.form {
	height: 100vh;
	background: #fff;
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
		
		.content {
			font-size: 14px;
		}
	}
	.btn-submit {
		margin-top: 50px;
	}
}
</style>
