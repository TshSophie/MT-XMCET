<template>
    <view class="content">
        <view class="article">
            <view class="title">
                {{title}}
            </view>
            <rich-text :nodes="strings" class="richText"></rich-text>
        </view>
    </view>
</template>

<script>
export default {
    name: 'Analysis',
    components: {
    },
    data() {
        return {
            title: '解析',
            strings: '<p>At the base of a mountain in TanzaniaAt the base ofAt the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of At the base of a mountain in TanzaniaAt the base of  a mountainAt the base of a mountainAt the base of a mountainAt the base of a mountainAt the base of a mountain</p><div style="text-align:center;"><img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png"/></div>',
          
        }
    },
}
</script>

<style lang="less" scoped>
.content {
    height: 100%;
    padding: 0 15rpx;
    .article {
        background: #fff;
        border-radius: 15rpx;
        box-shadow: #10161a1a 2px 2px 20px 2px;
        padding: 15rpx;
        margin-bottom: 15rpx;
        .title {
            font-weight: bold;
            font-size: 32rpx;
        }
        .richText {
            margin-top: 10rpx;
            font-size: 32rpx;
        }
    }
}
</style>