<template>
<!-- 搜索部分，点击搜索以后，在中间部分显示的内容，二级路由 -->
  <div>
    <van-search 
      v-model="value" 
      placeholder="请输入搜索关键词" 
      shape='round'
      @input="inputFn"
    />
    <template v-if="resultList.length==0">
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
    </template>

    <template v-else>
      <van-cell title="最佳匹配" class="hot_title"/>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <SongItem v-for="item in resultList" :key="item.id"
      :name="item.name"
      :author="item.ar[0].name"
      :id="item.id"
      ></SongItem>
        <!-- <van-cell center :title="item.name" 
          :label="`${item.ar[0].name} - ${item.name}`" 
          v-for="item in resultList" :key="item.id">
            <template #right-icon>
              <van-icon name="play-circle-o" class="play-icon"/>
            </template>
        </van-cell> -->
      </van-list>
    </template>
  </div>
</template>

<script>
//目标:铺设热搜关键字
//1.搜索框van-search组件,关键词标签和样式
//2.找接口, api/Search.js里定义获取搜索关键词的请求方法
//3.引入到当前页面,调用接口拿到数据循环铺设页面
//4.点击关键词把值赋予给van-search的v-model变量

// 目标:铺设搜索结果
// 1.找到搜索结果的接口-api/Search.js定义请求方法
// 2.再定义methods里getListFn方法(获取数据)
// 3.在点击事件方法里调用getListFn方法拿到搜索结果数据
// 4.铺设页面(首页van-cell标签复制过来)
// 5.把数据保存到data后,循环van-cell使用即可(切换歌手字段)
// 6.互斥显示搜索结果和热搜关键词

//目标:搜索框-显示结果
// 1. @inputSvan-search绑定事件
// 2. @input事件中,获取搜索结果保存resultList中
// 3.判断如果搜索关键字为空(.length=== 0),数组清空,阻止网络请求执行(提前return)

//目标:加载更多
//1.集成list组件-定义相关的变量(搞懂变量的作用)-监测触底事件
//2.一旦触底,自动执行onload方法
//3.对page++,给后台传递offset偏移量参数-请求下一页的数据
//4.把当前数据和下一页新来的数据拼接起来用在当前页面的数组里
//(切记)-加载更多数据后,一定要把loading改成false,保证下一次还能触发onload方法
import {searchHotAPI,searchResultAPI} from "@/apis"
import SongItem from '@/components/SongItem'
export default {
  components: {
    SongItem
  },
  data () {
    return {
      value:'',//获取的热搜关键字
      hotList:[],//热搜列表
      resultList:[],//搜索结果列表
      loading:false,//加载中的状态，只有为false,才能触底后自动触发onload方法
      finished:false,//未加载全部(如果设置为true,底部就不会再次执行onload,代表全部加载完成)
      page:1,//当前的页码
      timer:null//输入框防抖的定时器
    }
  },
  async created () {
    const res1=await searchHotAPI()
    console.log(res1.data.result.hots);
    this.hotList=res1.data.result.hots
  },
  methods: {
    async getResult(){
      return await searchResultAPI({
        keywords:this.value,
        limit:20,
        offset:(this.page-1)*20//固定公式
      })
      //(难点):
      //async修饰的函数->默认返回一个全新Promise对象
      //这个Promise对象的结果就是async函数内return的值
      //拿到getListFn的返回值用await提取结果
    },
    async clickFn(val){
      // 点击热搜关键词
      this.page=1;
      this.finished=false//点击新关键词-可能有新的数据
      this.value=val//选中的关键词显示到搜索框
      // 返回的是promise对象，所以需用用await来接收
      // console.log(this.getResult());
      const res=await this.getResult()
      console.log(res.data.result.songs);
      this.resultList=res.data.result.songs
      this.loading=false;//本次加载完成
    },
    // 触底事件（要加载下一页的数据）
    async onLoad(){
      this.page++;
      const res=await this.getResult();
      console.log(res.data.result.songs);
      if(res.data.result.songs==undefined){
        this.finished=true//finshed为true，表示不会再次触发下一页，表示没有数据了
        this.loading=false;
        return
      }
      this.resultList=[...this.resultList,...res.data.result.songs]
      this.loading=false;//数据加载完毕-保证下一次还能触发onload
    },
    async inputFn(){
      this.page=1;
      //目标:输入框改变-逻辑代码-慢点执行
      //解决:防抖
      //什么:计时n秒,最后执行一次,如果再次触发,重新计时
      if(this.timer) clearTimeout(this.timer)
      this.timer=setTimeout(async()=>{
        this.page=1;
        this.finished=false
        if(this.value.length===0){
          // 搜索关键词如果没有，就把搜索结果清空，并阻止网络请求发送，提前return结束运行
          this.resultList=[];
          return
        }
        const res=await this.getResult()
        if(res.data.result.songs==undefined){
          this.resultList=[];
          return
        }
        this.resultList=res.data.result.songs
        this.loading=false;
      },1000)
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