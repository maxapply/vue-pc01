// 基于vue 的插件
import MyBread from '@/components/my-bread' // 面包屑组件

export default {
  // 在main.js 使用Vue.user(当前插件)传入vue参数
  install (Vue) {
    // 使用Vue对象扩展功能
    Vue.component(MyBread.name, MyBread) // 面包屑组件
  }
}
