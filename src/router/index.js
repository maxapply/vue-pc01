import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/notfound'
import Article from '@/views/article'
import Publish from '@/views/publish'

// 获取本地用户信息
import auth from '@/utils/auth'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        component: Welcome
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/publish',
        component: Publish
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  // 404页面
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !auth.getUser().token) return next('/login')
  // if (to.path !== '/login') return next('/login')
  // if (!auth.getUser().token) return next('/login')
  next()
})

export default router
