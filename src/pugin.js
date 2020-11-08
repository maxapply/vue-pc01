// 基于vue 的插件
import MyBread from '@/components/my-bread' // 面包屑组件
import MyChannel from '@/components/my-channel' // 频道组件
import MyImage from '@/components/my-image' // 上传图片组件

export default {
  // 在main.js 使用Vue.user(当前插件)传入vue参数
  install (Vue) {
    // 使用Vue对象扩展功能
    Vue.component(MyBread.name, MyBread) // 面包屑组件
    Vue.component(MyChannel.name, MyChannel) // 频道组件
    Vue.component(MyImage.name, MyImage) // 上传图片组件
  }
}
