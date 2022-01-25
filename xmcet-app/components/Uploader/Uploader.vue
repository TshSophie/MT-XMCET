<template>
    <view class="uploader">
        <view class="preview" v-for="item in imageList" :key="item">
            <image :src="item" @click="previewImage(item)"></image>
        </view>
        <view class="add-image" @click="chooseImage" v-if="imageList.length < limit">
            <image src="@/static/assets/add.png"></image>
        </view>
    </view>
</template>
<script>

	export default {
		props:{
			limit: {
				type:Number,
				default:1
			}
		},
		data() {
			return {
				imageList: []
			}
		},
		methods: {			
			chooseImage() {				
				// 从相册选择6张图
				uni.chooseImage({
				    count: 6,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: (res) => {
						console.log(res)
						this.$nextTick(() => {							
							this.imageList = [...this.imageList, ...res.tempFilePaths]
						})
						console.log(this.imageList)
				    }
				});
			},
			previewImage(path) {
				console.log(path)
				// 预览图片
				uni.previewImage({
				    urls: [path],
				    longPressActions: {
				        itemList: ['发送给朋友', '保存图片', '收藏'],
				        success: function(data) {
				            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				        },
				        fail: function(err) {
				            console.log(err.errMsg);
				        }
				    }
				});
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
        margin: 0 5px;
        image {
            width: 100px;
            height: 100px;
        }
    }
}
</style>