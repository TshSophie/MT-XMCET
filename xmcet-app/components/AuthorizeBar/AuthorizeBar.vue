<template>
    <view class="authorize-box" v-if="!authorized">
		<view class="tips">登录后解锁更多功能 </view>
		<button type="default" size="mini" @click="getUserInfo">立即登录</button>
	</view>
</template>
<script>
import { authorizeUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
        authorized: state => state.user.authorized,
        }),
    },
    methods: {
        // 获取用户授权
        getUserInfo() {
            uni.getUserProfile({
                desc: '获取你的昵称、头像',
                success: res => {
                    console.log(res);
                    console.log(1);
                    // 更新授权信息
                    authorizeUserInfo({
                        avatar: res.userInfo.avatarUrl,
                        location: [res.userInfo.country, res.userInfo.province, res.userInfo.city].toString(),
                        gender: res.userInfo.gender,
                        nickName: res.userInfo.nickName,
                    }).then(response=>{
                        console.log(response)
                        if(response.code == 200) {
                            // 更新状态
                            this.$store.commit('SET_AUTHORIZED', true)
                            uni.showToast({
                                title: '授权成功',
                                icon: 'success',
                                duration: 2000
                            });
                        } else {
                            uni.showToast({
                                title: response.msg,
                                icon: 'error',
                                duration: 2000
                            });
                        }
                    })
                },
                fail: res => {
                    console.log(2);
                    console.log(res)
                    //拒绝授权
                    uni.showToast({
                        title: '登录失败',
                        icon: 'error',
                        duration: 2000
                    });
                    return;
                }
            });
        },
    },
}
</script>
<style lang="less" scoped>
.authorize-box {
	width: 100%;
	height: 40px;
	background: rgba(99, 90, 90, 0.5);
	display: flex;
	align-items: center;
	justify-content: space-around;
	.tips {
		color: #fff;
		font-size: 12px;
	}
	button {
		margin: 0;
		border-radius: 20px;
		text-align: center;
		border: 1px solid #86d461;
    	color: #86d461;
	}
}
</style>