<!--  -->
<template>
  <div class='contation-fans'>
    <el-card class="box-card">
      <!-- 面包屑组件 -->
      <div slot="header">
        <!-- 自定义的面包屑组件 -->
        <my-bread>粉丝管理</my-bread>
      </div>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fansList">
            <div class="fans_item" v-for="item in fansList" :key="Number(item.id)">
              <el-avatar :src="item.photo" :size="80"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+ 关注</el-button>
            </div>
          </div>
          <el-pagination :page-size="reqParams.per_page" :current-page="reqParams.page" @current-change="changePage" background layout="prev, pager, next" :total="total">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="粉丝画像" name="pictrue">
          <div style="width:600px;height:400px" ref="dom"></div>

        </el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import echarts from 'echarts'
export default {
  name: 'app-fans',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      activeName: 'list',
      total: 0,
      fansList: [],
      reqParams: {
        page: 1,
        per_page: 30
      }

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getFans () {
      const res = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = res.data.data.results
      this.total = res.data.data.total_count
    },
    // 切换分页
    changePage (e) {
      this.reqParams.page = e
      this.getFans()
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getFans()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const myChat = echarts.init(this.$refs.dom)
    // 指定图表的配置项和数据
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChat.setOption(option)
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
.fansList {
  width: 100%;
  .fans_item {
    display: inline-block;
    width: 100px;
    height: 180px;
    border: 1px dashed #ccc;
    text-align: center;
    margin-right: 69px;
    margin-bottom: 20px;
    padding-top: 10px;
    box-sizing: border-box;
    &:nth-child(10),
    &:nth-child(20),
    &:last-child {
      margin-right: 0;
    }

    p {
      margin: 10px auto;
      font-size: 12px;
    }
  }
}
</style>
