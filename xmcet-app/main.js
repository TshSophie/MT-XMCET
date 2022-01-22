import App from './App'
import store from './store'
// #ifndef VUE3
import Vue from 'vue'
import {share} from './mixins/index.js'
import { formatTime } from '@/utils/xmcet'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.formatTime  = formatTime 

//引入分享
Vue.mixin(share)

const app = new Vue({
  ...App,    
  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif