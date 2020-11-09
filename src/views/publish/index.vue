<!--  -->
<template>
  <div class='contation-publish'>
    <el-card class="box-card">
      <!-- 面包屑组件 -->
      <div slot="header">
        <!-- 自定义的面包屑组件 -->
        <my-bread>{{$route.query.id?'修改文章':'发布文章'}}</my-bread>
      </div>

      <el-form :model="articleFrom" label-width="120px">
        <el-form-item label="标题 : ">
          <el-input v-model="articleFrom.title" placeholder="请输入文章标题" style="width:400px"></el-input>
        </el-form-item>

        <el-form-item label="内容 : ">
          <quill-editor v-model="articleFrom.content" :options="editorOption" />
        </el-form-item>

        <el-form-item label="封面 : ">
          <el-radio-group @change="articleFrom.cover.images = []" v-model="articleFrom.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>

          <div v-if="articleFrom.cover.type===1">
            <my-image v-model="articleFrom.cover.images[0]"></my-image>
          </div>
          <div v-else-if="articleFrom.cover.type===3">
            <my-image v-for="i in 3" :key="i" v-model="articleFrom.cover.images[i-1]"></my-image>
          </div>

        </el-form-item>

        <el-form-item label="频道 : ">
          <!-- 自己封装的频道组件 -->
          <my-channel :value="articleFrom.channel_id" @input="articleFrom.channel_id=$event"></my-channel>
        </el-form-item>

        <el-form-item>
          <div v-if="$route.query.id">
            <el-button @click="update(false)" type="primary">修改文章</el-button>
          </div>
          <div v-else>
            <el-button @click="submit(false)" type="primary">发布文章</el-button>
            <el-button @click="submit(true)" type="primary" plain>存入草稿</el-button>
          </div>

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
        channel_id: null, // 频道
        content: '', // 文章内容
        cover: { // 封面
          type: 1, // 单图 三图
          images: [] // 图片
        }
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
  computed: {
  },
  // 监控data中的数据变化
  watch: {
    '$route.query.id': function () {
      this.toggleFormInfo()
    }
  },
  // 方法集合
  methods: {

    // 发布文章  存入草稿
    async submit (draft) {
      try {
        await this.$http.post(`articles?draft=${draft}`, this.articleFrom)
        this.$message.success(draft ? '存入草稿成功' : '发布文章发成')
        this.$router.push('article')
      } catch (e) {
        this.$message.error(draft ? '存入草稿失败' : '发布文章失败')
      }
    },
    // 获取修改文章信息
    async getArticle () {
      try {
        const res = await this.$http.get(`articles/${this.$route.query.id}`)
        this.articleFrom = res.data.data
      } catch (e) {
        this.$message.error('获取信息失败')
      }
    },
    // 切换表单信息
    toggleFormInfo () {
      if (this.$route.query.id) {
        this.getArticle()
      } else {
        this.articleFrom = {
          title: '', // 标题
          channel_id: null, // 频道
          content: '', // 文章内容
          cover: { // 封面
            type: 1, // 单图 三图
            images: [] // 图片
          }
        }
      }
    },
    // 修改文章
    async update () {
      try {
        await this.$http.put(`articles/${this.articleFrom.id}?draft=false`, this.articleFrom)
        this.$message.success('修改文章成功')
        this.$router.push('article')
      } catch (e) {
        console.log(e)
        this.$$message.error('修改文章失败')
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (this.$route.query.id) {
      this.getArticle()
    }
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
