import store from '@/store'
import { authorizeUserInfo } from '@/api/user'

// 封装授权弹窗
export const popAuthorizedWindow = (callback) => {
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
                    store.commit('SET_AUTHORIZED', true)
                    // 成功回调
                    callback && callback(true)
                    uni.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                    });
                } else {
                    // 失败回调
                    callback && callback(false)
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
            // 失败回调
            callback && callback(false)
            //拒绝授权
            uni.showToast({
                title: '登录失败',
                icon: 'error',
                duration: 2000
            });
            return;
        }
    });
}