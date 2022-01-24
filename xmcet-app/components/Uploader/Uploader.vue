<template>
    <view class="uploader">
        <view class="preview">
            <image src="@/static/logo.png"></image>
        </view>
        <view class="add-image">
            <image src="@/static/assets/add.png"></image>
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
        margin: 0 10px;
        image {
            width: 100px;
            height: 100px;
        }
    }
}
</style>