export const getCurrentPagePath = () => {
    let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
    let curRoute = routes[routes.length - 1].route //获取当前页面路由
    let curParam = routes[routes.length - 1].options; //获取路由参数
    // 拼接参数
    let param = ''
    for (let key in curParam) {
        param += '&' + key + '=' + curParam[key]
    }
    param = param.substring(1, param.length)
    console.log(param)
    // let data = {}
    // data.curRoute = curRoute
    // data.curParam = curParam
    return curRoute + '?' + param
}


/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
 export function formatTime(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000
    } else {
    //   time = +time
    }
    const d = new Date(time)
    const now = Date.now()
    const diff = (now - d) / 1000
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  }