<!--  -->
<template>
  <div class='contation-publish'>
    <el-card class="box-card">
      <!-- 面包屑组件 -->
      <div slot="header">
        <!-- 自定义的面包屑组件 -->
        <my-bread>发布文章</my-bread>
      </div>

      <el-form :model="articleFrom" label-width="120px">
        <el-form-item label="标题 : ">
          <el-input v-model="articleFrom.title" placeholder="请输入文章标题" style="width:400px"></el-input>
        </el-form-item>

        <el-form-item label="内容 : ">
          <quill-editor v-model="articleFrom.content" :options="editorOption" />
        </el-form-item>

        <el-form-item label="封面 : ">
          <el-radio-group v-model="articleFrom.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>

          <div>
            <my-image @input="articleFrom.iamge = $event"></my-image>
            <my-image></my-image>
            <my-image></my-image>
          </div>

        </el-form-item>

        <el-form-item label="频道 : ">
          <!-- 自己封装的频道组件 -->
          <my-channel :value="articleFrom.channel_id" @input="articleFrom.channel_id=$event"></my-channel>
        </el-form-item>

        <el-form-item>
          <el-button type="success">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
export default {
  name: 'app-publish',
  // import引入的组件需要注入到对象中才能使用
  components: {
    quillEditor
  },
  data () {
    // 这里存放数据
    return {
      articleFrom: {
        title: '', // 标题
        resource: '', // 封面
        channel_id: null, // 频道
        content: '',
        cover: {
          type: 1,
          images: []
        },
        iamge: ''
      },
      editorOption: {
        placeholder: '',
        // Some Quill options...
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
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
// @import url() 引入公共css类
</style>
