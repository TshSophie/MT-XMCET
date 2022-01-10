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