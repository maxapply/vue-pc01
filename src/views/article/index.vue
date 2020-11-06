<!--  -->
<template>
  <div class='contation-article'>
    <el-card class="box-card">
      <!-- 面包屑组件 -->
      <div slot="header">
        <!-- 自定义的面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>

      <!-- 表单 -->
      <el-form label-width="80px">

        <el-form-item label="状态 : ">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道 : ">
          <el-select v-model="filterData.channel_id" placeholder="请选择">
            <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期 : ">
          <el-date-picker v-model="dataArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件查询到 {{this.artNum}} 条结果：</div>

      <el-table :data="articles">
        <el-table-column label="封面" prop="date">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:200px;height:130px">
              <div slot="error">
                <img class="articleList" src="../../assets/images/notImg.png" alt="" style="width:200px;height:130px">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title">
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-button v-show="scope.row.status===0" size="mini" type="info" plain>草稿</el-button>
            <el-button v-show="scope.row.status===1" size="mini" plain>待审核</el-button>
            <el-button v-show="scope.row.status===2" size="mini" type="success" plain>审核通过</el-button>
            <el-button v-show="scope.row.status===3" size="mini" type="warning" plain>审核失败</el-button>
            <el-button v-show="scope.row.status===4" size="mini" type="danger" plain>已删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" circle plain></el-button>
          <el-button type="danger" icon="el-icon-delete" circle plain></el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination style="margin-top:20px" background layout="prev, pager, next" :total="this.artNum"></el-pagination>
    </el-card>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
export default {
  name: 'app-article',
  // import引入的组件需要注入到对象中才能使用
  components: {
  },
  data () {
    // 这里存放数据
    return {
      filterData: {
        status: null, // 状态
        channel_id: null, // 频道
        begin_pubdate: '', // 起始日期
        end_pubdate: '', // 结束日期
        page: 1, // 页数
        per_page: 20, // 每页数量
        response_type: ''
      },
      // 频道 数据
      channelOptions: [],
      // 日期范围数据
      dataArr: [],
      // 文章 列表 数据
      articles: [],
      // 文章总数
      artNum: null
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onSubmit () {

    },
    // 获取 频道 信息
    async getChennelOptionts () {
      try {
        const res = await this.$http.get('channels')
        this.channelOptions = res.data.data.channels
      } catch (e) {
        console.log(e)
      }
    },
    // 获取文章列表信息
    async getArticle () {
      try {
        const res = await this.$http.get('articles', { paromise: this.filterData })
        this.articles = res.data.data.results
        console.log(res)
        this.artNum = res.data.data.total_count
      } catch (e) {
        console.log(e)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getChennelOptionts() // 获取 频道信息
    this.getArticle() // 获取 文章 列表信息
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
<style lang='less'>
// @import url() 引入公共css类
.articleList {
  width: 200px;
  height: 100px;
  vertical-align: middle;
}
.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
</style>
