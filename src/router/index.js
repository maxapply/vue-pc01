import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        component: Welcome
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
