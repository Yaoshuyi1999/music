<template>
<!-- 搜索部分，点击搜索以后，在中间部分显示的内容，二级路由 -->
  <div>
    <van-search v-model="value" placeholder="请输入搜索关键词" shape='round'/>
    <div class="search_wrap">
      <van-cell title="热门搜索" class="hot_title"/>
      <div class="hot_name_wrap">
        <van-tag 
          round type="primary" 
          size="large" 
          color="lightgreen"
          text-color="blue" 
          style="margin: 6px; padding:8px"
          v-for="(item,index) in hotList" :key="index"
          @click="clickFn(item.first)"
        >{{item.first}}</van-tag>
      </div>
    </div>

    <van-cell title="最佳匹配" class="hot_title"/>
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </template>
      <template #right-icon>
        <van-icon name="play-circle-o" class="play-icon"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
//目标:铺设热搜关键字
//1.搜索框van-search组件,关键词标签和样式
//2.找接口, api/Search.js里定义获取搜索关键词的请求方法
//3.引入到当前页面,调用接口拿到数据循环铺设页面
//4.点击关键词把值赋予给van-search的v-model变量
import {searchHotAPI,searchResultAPI} from "@/apis"
export default {
  data () {
    return {
      value:'',
      hotList:[],
    }
  },
  async created () {
    const res1=await searchHotAPI()
    console.log(res1.data.result.hots);
    this.hotList=res1.data.result.hots
  },
  methods: {
    async clickFn(val){
      this.value=val
    },
    async getResult(){
      return await searchResultAPI({
        keywords:this.value,
        limit:20,
      })
    }
  }
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.play-icon {
  font-size: 20px;
  margin-top: 12px;
}
</style>