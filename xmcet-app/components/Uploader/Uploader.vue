<template>
    <view class="uploader">
        <view class="preview" v-for="item in imageList" :key="item">
            <image src="@/static/assets/close.png" @click="close(item)" class="icon-close"></image>
            <image :src="item" @click="previewImage(item)"></image>
        </view>
        <view class="add-image" @click="chooseImage" v-if="imageList.length < limit">
            <image src="@/static/assets/add.png"></image>
        </view>
    </view>
</template>
<script>

	export default {
		emits:['handleChoose', 'handleDelFile'],
		props: {
			limit: {
				type: Number,
				default:1
			},
			value: {
				type: Array,
			}
		},
		data() {
			return {
				imageList: [],
				fileList: []
			}
		},
		methods: {
			chooseImage() {
				// 从相册选择6张图
				uni.chooseImage({
				    count: this.limit,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: (res) => {
						console.log(res)
						this.$nextTick(() => {
							this.imageList = [...this.imageList, ...res.tempFilePaths]
						})
						this.fileList = [...this.fileList, ...res.tempFiles]

						this.$emit('handleChoose', this.fileList)
						this.$emit('input', this.fileList)
				    }
				});
			},
			previewImage(path) {
				console.log(path)
				let index = this.imageList.indexOf(path)
				// 预览图片
				uni.previewImage({
				    urls: this.imageList,
				    current: index,
					indicator: "number",
					loop: true
				});
			},
            close(item) {
                this.imageList.splice(this.imageList.indexOf(item), 1)
                this.fileList.splice(this.fileList.findIndex(file => {return file.path == item}), 1)
				this.$emit('handleDelFile', this.fileList)
            }
		}
	}
</script>
<style lang="less" scoped>
.uploader {
    display: flex;
    flex-wrap: wrap;
	.add-image {
        width: 100px;
        height: 100px;
        background: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
            height: 50px;
            width: 50px;
        }
    }
    .preview {
        position: relative;
        margin: 0 3px;
        image {
            width: 100px;
            height: 100px;
        }

        .icon-close {
            right: -5px;
            top: -10px;
            position: absolute;
            width: 20px;
            height: 20px;
            z-index: 9;
        }
    }
}
</style>