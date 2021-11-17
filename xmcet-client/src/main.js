import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 权限
import './permission'
// Element
import ElementUI from 'element-ui'
import Cookies from 'js-cookie'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
// 自定义全局样式
import '@/assets/styles/index.less'
import '@/assets/icons'
import { getDicts } from '@/api/system/dict'
import {
  parseTime,
  resetForm,
  addDateRange,
  selectDictLabel,
  handleTree,
  download,
  rightExists,
  runNum,
  isJSON
} from '@/utils/mt'
// 分页组件
import Pagination from '@/components/Pagination'

Vue.prototype.getDicts = getDicts
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.handleTree = handleTree
Vue.prototype.resetForm = resetForm
Vue.prototype.download = download
Vue.prototype.runNum = runNum
Vue.prototype.rightExists = rightExists
Vue.prototype.isJSON = isJSON

Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  zIndex: 2000 // 弹出层的z-index默认值
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
