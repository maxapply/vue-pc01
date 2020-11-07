<!--  -->
<template>
  <div class='contation-image'>
    <el-card class="box-card">
      <!-- 面包屑组件 -->
      <div slot="header">
        <!-- 自定义的面包屑组件 -->
        <my-bread>素材管理</my-bread>
      </div>

      <!-- 按钮 -->
      <div class="btn-box">
        <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small" style="margin-bottom: 20px;">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>

        <el-button type="success" style="float:right" size="small">添加素材</el-button>
      </div>

      <!-- 列表 -->
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt="">
          <div class="option" v-show="!reqParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="totalStatus(item)"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination style="text-align:center;margin-top:30px" :page-size="reqParams.per_page" :current-page="reqParams.paeg" @current-change="imageChange" background layout="prev, pager, next" :total="total"></el-pagination>

    </el-card>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  namr: 'app-image',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      reqParams: {
        collect: false, // 全部与收藏
        paeg: 1,
        per_page: 15
      },
      total: 0, // 总条数
      images: [] // 图片素材
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 获取图片素材
    async getImages () {
      try {
        const res = await this.$http.get('user/images', { params: this.reqParams })
        this.images = res.data.data.results
        this.total = res.data.data.total_count
      } catch (e) {
        console.log(e)
      }
    },
    // 页码 改变 获取对应内容
    imageChange (e) {
      this.reqParams.paeg = e
      this.getImages() // 获取图片素材
    },
    // 全部 与 收藏的切换
    changeCollect () {
      this.reqParams.paeg = 1
      this.getImages() // 获取图片素材
    },
    // 切换收藏
    async totalStatus (item) {
      try {
        const res = await this.$http.put(`/user/images/${item.id}`, { collect: !item.is_collected })
        // this.getImages()
        // this.$message.success('操作成功')
        this.$message.success(res.data.data.collect ? '添加成功' : '取消成功')
        item.is_collected = res.data.data.collect
      } catch (e) {
        this.$message.error('操作失败')
        console.log(e)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getImages() // 获取图片素材
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
.img-list {
  width: 100%;
  overflow: hidden;
  .img-item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ccc;
    position: relative;
    margin-top: 20px;
    display: inline-block;
    margin-right: 177px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .option {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        color: #fff;
        margin: 0 30px;
      }
      .red {
        color: #ff0000;
      }
    }
    &:nth-child(5),
    &:nth-child(10),
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
