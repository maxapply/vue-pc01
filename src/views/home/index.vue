<!--  -->
<template>
  <el-container class="contation-home">
    <!-- 左侧导航 -->
    <el-aside :width="isOpen?'200px':'64px'" class="my-aside">
      <div class="logo">
        <img :src="isOpen?'/img/home-logo.f2e4560f.png':'/img/min-home-logo.f6ba3fb3.png'" alt="">
      </div>

      <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="!isOpen" :collapse-transition="false" background-color="#333333" style="border-right:none" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>

    </el-aside>
    <!-- 右侧内容 -->
    <el-container>
      <!-- 头部导航 -->
      <el-header class="my-header">
        <span class="icon el-icon-s-fold" @click="toggleMent()"></span>
        <span class="text">优贝口腔</span>
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img class="header" src="../../assets/images/user_top.jpg" alt="">
            <strong class="name">张三</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'home',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      isOpen: true
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    toggleMent () {
      // 点击切换状态
      this.isOpen = !this.isOpen
    }

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
// @import url(); 引入公共css类
.contation-home {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .my-aside {
    background-color: #333333;
    .logo {
      width: 100%;
      height: 60px;
      background-color: #666666;
      img {
        display: block;
        width: 80%;
        margin: 0 auto;
      }
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 20px;
      vertical-align: middle;
    }
    .text {
      margin-left: 20px;
      letter-spacing: 2px;
    }
    .my-dropdown {
      float: right;
    }
    .header {
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
    .namer {
      margin-left: 5px;
      vertical-align: middle;
    }
  }
}
</style>
