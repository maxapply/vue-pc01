<!--  -->
<template>
  <div class='my-image'>
    <div class="img-btn" @click="openDialog"> +</div>

    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="list">
          <!-- 按钮 -->
          <el-radio-group v-model="reqParsms.collect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>

          <!-- 列表 -->
          <div class="img-list">
            <div class="img-item" v-for="i in 8" :key="i">
              <img src="" alt="">
            </div>
          </div>

          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="total">
          </el-pagination>

        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upLoad">上传图片</el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  name: 'my-image',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      dialogVisible: false, // 打开对话框
      activeName: 'list',
      reqParsms: {
        collect: false, // 全部 收藏 按钮
        page: 1,
        per_page: 8
      },
      total: 0 // 总页数
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
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
// @import url() 引入公共css类
.my-image {
  display: inline-block;
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  font-size: 60px;
  text-align: center;
  line-height: 150px;
  margin-top: 20px;
  color: #ccc;
  margin-right: 20px;
  &:hover {
    border: 1px dashed #3366ff;
    color: #3366ff;
  }
}

.img-list {
  margin: 30px 0 10px;
  .img-item {
    display: inline-block;
    width: 150px;
    height: 120px;
    border: 1px solid #ccc;
    margin-right: 34px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    &:nth-child(4),
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
