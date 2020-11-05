<!--  -->
<template>
  <div class='contation-notfound'>
    <h4>您访问的页面不见了！</h4>
    <h5><a href="/" class="go-sohu">去首页</a></h5>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>
.contation-notfound {
  width: 50%;
  margin: 250px auto 0;
  height: 550px;
  background: url(../../assets/images/404_bg.png) no-repeat 0 0;
  h4 {
    font-size: 24px;
    color: #191919;
    padding-bottom: 16px;
    text-align: right;
  }
  h5 {
    font-size: 100%;
    font-weight: 400;
    text-align: right;
    .go-sohu {
      width: 130px;
      height: 38px;
      background: #c9141d;
      line-height: 38px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      display: inline-block;
      border-radius: 2px;
      text-decoration: none;
      letter-spacing: 5px;
    }
  }
}
</style>
