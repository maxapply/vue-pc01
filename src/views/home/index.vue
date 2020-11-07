<!--  -->
<template>
  <el-container class="contation-home">
    <!-- 左侧导航 -->
    <el-aside :width="isOpen?'200px':'64px'" class="my-aside">
      <div class="logo">
        <img src="../../assets/images/home-logo.png" :class="{hide:!isOpen}" alt="">
        <img src="../../assets/images/min-home-logo.png" :class="{hide:isOpen}" alt="">
      </div>

      <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" :collapse="!isOpen" :collapse-transition="false" background-color="#333333" style="border-right:none" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/images">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="setting">
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
        <el-dropdown class="my-dropdown" @command="headerClick">
          <span class="el-dropdown-link">
            <img class="header" :src="user_info.photo" alt="">
            <strong class="name">{{user_info.name}}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
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
import auth from '@/utils/auth'
export default {
  name: 'home',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      isOpen: true,
      user_info: {
        name: '',
        photo: ''
      }

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
    },
    headerClick (command) {
      if (command === 'setting') {
        return this.$router.push('/setting')
      }
      if (command === 'logout') {
        auth.removeUser()
        this.$router.push('/login')
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    const user = auth.getUser()
    this.user_info.name = user.name
    this.user_info.photo = user.photo
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
      .hide {
        display: none;
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
      margin-right: 20px;
    }
    .namer {
      margin-left: 5px;
      vertical-align: middle;
    }
  }
}
</style>
