import errorCode from "@/utils/errorCode";
import {
	config
} from '@/config.js'
import { getToken } from '@/api/user'
import { getCurrentPagePath } from '@/utils/xmcet'
import store from '@/store'

// 封装request请求函数
export const apiResquest = (params) => {
  var url = config.base_url + params.url;
  // 如果没有设置请求类型则默认为GET请求
  if (!params.method) {
    params.method = "GET";
  }
  return new Promise((resolve, reject) => {
    uni.showLoading({
        title: '加载中',
        mask: true
    })
    return uni.request({
      url: url,
      data: params.data,
      header: {
        "content-type": "application/json",
        token: wx.getStorageSync("token"), // 从缓存中读取token值
      },
      method: params.method,
      success: function (res) {
        uni.hideLoading()
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;
        // 获取错误信息
        const message = errorCode[code] || res.data.msg || errorCode["default"];
        // token过期重新登录
        if (code === 401) {
          // 重新登录
          // #ifdef  MP-WEIXIN	
            uni.login({
              provider: 'weixin',
              success: (loginRes) => {
                getToken({code: loginRes.code}).then(response => {
                  console.log(response)
                  // 缓存token,和授权标记
                  // wx.setStorageSync('authorized', response.data.authorized);
                  wx.setStorageSync('token', response.data.token);
                  store.commit('SET_AUTHORIZED', response.data.authorized)
                  store.commit('SET_TOKEN', response.data.token)
                  console.log(encodeURIComponent(getCurrentPagePath()))
                  uni.redirectTo({
                    url: '/pages/refresh/refresh?from=' + encodeURIComponent(getCurrentPagePath())
                  })
                })
              }
            });
          // #endif
        } else if (code === 500) {
          wx.showToast({
              title: "矮油o(╥﹏╥)o，服务出问题了",
              icon: "none",
          });
          return;
        } else if (code !== 200) {
          wx.showToast({
              title: message,
              icon: "none",
          });
          return;
        }
        // 成功请求数据
        resolve(res.data);
      },
      fail: (err) => {
				reject(err);
				uni.hideLoading()
			},
			complete: () => {
				uni.hideLoading()
			}
    });
  })
  
}
