<!--  -->
<template>
  <div class='my-image'>
    <div class="img-btn" @click="openDialog">
      <img :src="value||imageBtn" alt="">
    </div>

    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="list">
          <div v-loading="loading">
            <!-- 按钮 -->
            <el-radio-group v-model="reqParsms.collect" @change="changeCollect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>

            <!-- 列表 -->
            <div class="img-list">
              <div class="img-item" :class="{selected:selectedImage==item.url}" @click="selected(item.url)" v-for="item in images" :key="item.id">
                <img :src="item.url" alt="">
              </div>
            </div>

            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" hide-on-single-page @current-change="changePage" :current-page="reqParsms.page" :page-size="reqParsms.per_page" :total="total">
            </el-pagination>

          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upLoad">
          <el-upload class="avatar-uploader" action="http://ttapi.research.itcast.cn/mp/v1_0/user/images" name="image" :headers="upLoadHeaders" :show-file-list="false" :on-success="handleSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import auth from '@/utils/auth'
import addImg from '@/assets/images/addImg.png'

export default {
  name: 'my-image',
  props: ['value'],
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
      total: 0, // 总页数
      images: [], // 图片数据
      loading: true, // 加载效果
      selectedImage: '', // 记录图片值
      upLoadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      }, // 图片上传的请求头
      imageUrl: '', // 图片
      imageBtn: addImg
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
      this.activeName = 'list' // 默认激活第一个选项卡
      this.dialogVisible = true // 显示对话框
      this.getImage() // 获取图片素材
      this.selectedImage = ''
      this.imageUrl = ''
    },
    // 获取图片信息
    async getImage () {
      try {
        this.loading = true
        const res = await this.$http.get('user/images', { params: this.reqParsms })
        this.images = res.data.data.results
        this.total = res.data.data.total_count
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    },
    // 全部  收藏切换
    changeCollect (e) {
      this.reqParsms.collect = e
      this.reqParsms.page = 1
      this.getImage()
    },
    // 页码改变后
    changePage (e) {
      this.reqParsms.page = e
      this.getImage()
    },
    // 点击图片
    selected (url) {
      this.selectedImage = url
    },
    // 上传成功
    handleSuccess (res, file) {
      this.$message.success('上传成功')
      this.imageUrl = res.data.url
    },
    // 点击确认按钮
    confirmImage () {
      this.dialogVisible = false
      if (this.activeName === 'list') {
        if (!this.selectedImage) {
          return this.$message.warning('请选择一张图片')
        }
        this.$emit('input', this.selectedImage)
      } else {
        if (!this.imageUrl) {
          return this.$message.warning('请上传一张图片')
        }
        this.$emit('input', this.imageUrl)
      }
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
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &:hover {
    border: 1px dashed #5599ff;
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
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5) url(../assets/images/check_mark.png)
        no-repeat center / 50px auto;
      top: 0;
      left: 0;
      z-index: 2;
    }
    &:nth-child(4),
    &:last-child {
      margin-right: 0;
    }
  }
}

.avatar-uploader {
  margin-top: 25px;
}
</style>
