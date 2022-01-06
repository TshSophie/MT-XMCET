
<template>
    <view class="container">
        <image class="logo" src="/static/logo.png" />
        <text class="title">欢迎加入小麦CET</text>
        <text class="tips">需要授权获取您的昵称等信息</text>
        <span class="btn" @click="handleAuthorize">点击授权</span>
    </view>
</template>
<script>

export default {
    data() {
        return {
            
        }
    },
    methods: {
        handleAuthorize() {

        }
    },
}
</script>
<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo {
        width: 50px;
        height: 50px;
    }
    .title {
        color: #ddd;
        font-size: 16px;
    }
    .tips {
        font-size: 13px;
    }
    .btn {
        width: 70px;
        height: 45px;
        color: #fff;
        background: greenyellow;
    }
}
</style>