<!--  -->
<template>
  <div class='contation-setting'>
    <el-card class="box-card">
      <!-- 面包屑组件 -->
      <div slot="header">
        <!-- 自定义的面包屑组件 -->
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="user" label-width="120px">
            <el-form-item label="编号 :"> {{user.id}}</el-form-item>

            <el-form-item label="手机号 :"> {{user.mobile}} </el-form-item>

            <el-form-item label="媒体名称 :">
              <el-input v-model="user.name"></el-input>
            </el-form-item>

            <el-form-item label="媒体介绍 : ">
              <el-input type="textarea" :rows="3" v-model="user.intro"></el-input>
            </el-form-item>

            <el-form-item label="邮箱 :">
              <el-input v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveSetting">保存设置</el-button>
            </el-form-item>
          </el-form>

        </el-col>
        <el-col :span="12">
          <el-upload :http-request="upLoaderImage" class="avatar-uploader" action="" :show-file-list="false">
            <img v-if="user.photo" :src="user.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>

        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import auth from '@/utils/auth'
import eventBus from '@/eventBus'
export default {
  name: 'app-setting',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      user: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      }
      // upLoadHeaders: {
      //   Authorization: `Bearer ${auth.getUser().token}`
      // } // 图片上传的请求头

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getUserInfo () {
      const res = await this.$http.get('user/profile')
      this.user = res.data.data
    },
    // 修改用户信息
    async saveSetting () {
      const { name, intro, email } = this.user
      await this.$http.patch('user/profile', { name, intro, email })
      this.$message.success('修改信息成功')

      const user = auth.getUser()
      user.name = name
      auth.setUser(user)
      eventBus.$emit('updataUserName', name)
    },
    // 上传头像
    async upLoaderImage ({ file }) {
      try {
        const fd = new FormData()
        fd.append('photo', file)
        const res = await this.$http.patch('user/photo', fd)
        this.user.photo = res.data.data.photo

        const user = auth.getUser()
        user.photo = res.data.data.photo

        auth.setUser(user)
        eventBus.$emit('updataUserImage', res.data.data.photo)
        this.$message.success('修改头像成功')
      } catch (e) {
        this.$message.error('修改头像失败')
      }
    }

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getUserInfo()
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
// @import url() 引入公共css类
</style>
