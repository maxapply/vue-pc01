<!--  -->
<template>
  <!-- 全凭容器 -->
  <div class='contation-login'>
    <el-card class="my-card">
      <img src="../../assets/images/logo.png" alt="">

      <el-form ref="loginForm" status-icon :rules="LoginRules" :model="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:239px;margin-right:8px"></el-input>
          <el-button>获取验证码</el-button>
        </el-form-item>

        <el-form-item>
          <el-checkbox :value="true">我以阅读用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-button type="primary" style="width:100%" @click="submitForm('loginForm')">立即登录</el-button>

      </el-form>

    </el-card>

  </div>
</template>

<script>
import auth from '@/utils/auth'
// import auth from '@/utils/auth'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'login',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 手机号自定义校验
    var checkMobile = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    // 这里存放数据
    return {
      // 表单数据
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单进行验证
      LoginRules: {
        mobile: [
          //  是否必填         错误提示                  校验方式
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码6个字符', trigger: 'blur' }
        ]
      }

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

    submitForm (loginForm) {
      // 点击登录验证
      this.$refs[loginForm].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            // 本地存储用户 信息
            auth.setUser(res.data.data)
            // 登录成功跳转到首页
            this.$router.push('/')
          } catch (err) {
            // 输出错误提示信息
            console.log(err)
          }
        }
      })
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
.contation-login {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login-bgc.jpg) no-repeat center / 100%
    100%;
  position: absolute;
  top: 0;
  left: 0;
  .my-card {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    img {
      width: 250px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>
