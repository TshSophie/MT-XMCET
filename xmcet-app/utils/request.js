import errorCode from "@/utils/errorCode";
import {
	config
} from '@/config.js'

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
          uni.showModal({
              title: '温馨提示',
              content: '亲，授权微信登录后才能正常使用小程序功能',
              success(res) {
                  console.log(0)
                  console.log(res)
                  //如果用户点击了确定按钮
                  if (res.confirm) {
                      uni.getUserProfile({
                          desc: '获取你的昵称、头像及性别',
                          success: res => {
                              console.log(res);
                              console.log(1);
                          },
                          fail: res => {
                              console.log(2);
                              console.log(res)
                              //拒绝授权
                              uni.showToast({
                                  title: '您拒绝了请求,不能正常使用小程序',
                                  icon: 'error',
                                  duration: 2000
                              });
                              return;
                          }
                      });
                  } else if (res.cancel) {
                      //如果用户点击了取消按钮
                      console.log(3);
                      uni.showToast({
                          title: '您拒绝了请求,不能正常使用小程序',
                          icon: 'error',
                          duration: 2000
                      });
                      return;
                  }
              }
          });        
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
        console.log(res.data)
      },
      fail: (err) => {
				reject(err);
				console.log(err)
				uni.hideLoading()
			},
			complete: () => {
				console.log('请求完成')
				uni.hideLoading()
			}
    });
  })
  
}
