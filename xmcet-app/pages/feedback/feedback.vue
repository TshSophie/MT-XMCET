<template>
	<view class="form">
		<uni-forms ref="form" :modelValue="form" :rules="rules" label-position="left">
			<uni-forms-item label="反馈类型" required name="type">
				<picker class="picker" @change="bindPickerChangeType" v-model="form.type" :value="form.type" :range="typeArray">
					<view class="uni-input">{{typeArray[form.type]}}</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item label="反馈内容" required name="title">
				<picker class="picker" @change="bindPickerChangeTitle" v-model="form.title" :value="form.title" :range="titleArray">
					<view class="uni-input">{{titleArray[form.title]}}</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item label="详细" required name="content" label-position="top">
				<uni-easyinput type="textarea" v-model="form.content" :maxlength="200" :trim="true" placeholder="请填写10个字以上的问题描述，以便我们提供更好的帮助"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item :label="`截图(${form.images.length}/4)`" name="images" label-position="top">
				<Uploader class="uploader" :limit="4" @handleChoose="handleChoose" v-model="form.images"/>
			</uni-forms-item>
			<uni-forms-item label="联系方式" required name="link">
				<uni-easyinput v-model="form.link" placeholder="邮箱/手机号" :maxlength="50" :trim="true" ></uni-easyinput>
			</uni-forms-item>
			<button type="primary" class="btn-submit" @click="submitForm">提交</button>
		</uni-forms>
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
				form: {},
				rules: {
					type: {
						rules: [
							{
								required: true,
								errorMessage: '请选择反馈类型',
							},
						]
					},
					title: {
						rules: [
							{
								required: true,
								errorMessage: '请选择反馈内容',
							},
						]
					},
					content: {
						rules: 
						[
							{
								required: true,
								errorMessage: '请填写反馈详细描述',
							},
						]
					},
					link: {
						rules: [{
							required: true,
							errorMessage: '请填写联系方式',
						},
						// {
						// 	// pattern: /^[1][3,4,5,7,8][0-9]{9}$|^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/g,
						// 	errorMessage: "请输入正确的邮箱格式或手机号",
						// 	// validateFunction(rule,value,data,callback){
						// 	// 	// let phonenumber = /^[1][3,4,5,7,8][0-9]{9}$/
						// 	// 	// let email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
						// 	// 	// console.log(value)
						// 	// 	// console.log(phonenumber.test(value))
						// 	// 	// if (phonenumber.test(value) || email.test(value)) {
						// 	// 	// 	callback()
						// 	// 	// } else {
						// 	// 	// 	callback('请输入正确的邮箱格式或手机号')
						// 	// 	// }
						// 	// 		callback('请输入正确的邮箱格式或手机号')
						// 	// }
						// }
						]
					}
				}
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
				this.$refs.form.validate().then(async res=>{
					console.log('表单数据信息：', res);

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
							duration: 10000,
							icon: 'success',
							complete: ()=>{
								uni.navigateTo({
									url: '/pages/feedbackList/feedbackList'
								});
							}
						});
						
					})
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
			handleChoose(e) {
				console.log(e)
				console.log(this.form)
			},
			bindPickerChangeType(event) {
				this.form.type = event.detail.value
				if(this.form.type == 1) {
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
	.picker {
		margin-top: 9px;
	}
	.btn-submit {
		margin-top: 30px;
	}
}
</style>
