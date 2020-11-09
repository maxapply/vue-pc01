<!--  -->
<template>
  <div class='contation-comment'>
    <el-card class="box-card">
      <!-- 面包屑组件 -->
      <div slot="header">
        <!-- 自定义的面包屑组件 -->
        <my-bread>评论管理</my-bread>
      </div>

      <div v-loading="loading">
        <el-table :data="comments" style="width: 100%">
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数">
          </el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数">
          </el-table-column>
          <el-table-column label="评论状态">
            <template slot-scope="scope">{{ scope.row.comment_status ? '打开' : '关闭'}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.comment_status" @click="toggleStatus(scope.row)" type="danger">关闭评论</el-button>
              <el-button v-else type="success" @click="toggleStatus(scope.row)">打开评论</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin-top:20px" @current-change="changgePage" background layout="prev, pager, next" :page-size="reqParams.per_page" :current-page="reqParams.page" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  name: 'app-comment',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      comments: [], // 评论列表
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 10
      },
      total: 0, // 总条数
      loading: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 获取信息
    async getComments () {
      this.loading = true
      const res = await this.$http.get('articles', { params: this.reqParams })
      this.comments = res.data.data.results
      this.total = res.data.data.total_count
      this.loading = false
    },
    // 分页
    changgePage (e) {
      this.reqParams.page = e
      this.getComments()
    },
    // 切换状态
    toggleStatus (row) {
      this.$confirm(row.comment_status ? '您确定要关闭文章的评论功能，关闭后用户无法对文章进行评论 ？' : '您确定要打开文章的评论功能？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
          this.$message.success(res.data.data.allow_comment ? '打开评论成功' : '关闭评论成功')
          row.comment_status = res.data.data.allow_comment
        } catch (e) {
          this.$message.error('操作失败')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败'
        })
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getComments()
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
