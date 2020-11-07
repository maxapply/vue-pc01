import Vue from 'vue'
import App from '@/App.vue'// axios
import router from '@/router' // 路由
import store from '@/store'

import axios from '@/api' // 配置好的 axios
import ElementUI from 'element-ui' // element 组件库
import 'element-ui/lib/theme-chalk/index.css' // element 组件库
import '@/styles/index.less' // 全局样式

// 自己封装的插件
import Pugin from '@/pugin.js'

Vue.use(Pugin) // 自己封装的插件
Vue.use(ElementUI) // element 插件

Vue.prototype.$http = axios // 挂载 $http 对象 就是axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
