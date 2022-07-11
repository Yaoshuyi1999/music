<template>
<!-- 首页，点击首页导航后，中间部分显示的内容，二级路由 -->
  <div style="margin-bottom:45px">
    <!-- 推荐歌单 -->
    <van-cell title="推荐歌单" class="title"/>
    <!-- <van-grid>
      <van-grid-item v-for="item in reList" :key="item.id">
        <van-image width="100" height="100" :src="item.picUrl" />
        <p class="song_name">{{item.name}}</p>
      </van-grid-item>
    </van-grid> -->
    <van-row gutter="8">
      <!-- 这边的span采用的是栅格化24布局 -->
      <van-col span="8" v-for="item in reList" :key="item.id">
        <van-image width="100%" height="3rem" :src="item.picUrl" />
        <p class="song_name">{{item.name}}</p>
      </van-col>    
    </van-row>

    <!-- 最新音乐 -->
    <van-cell title="最新音乐" class="title"/>
    <van-cell center :title="item.name" 
    :label="`${item.song.artists[0].name} - ${item.name}`" 
    v-for="item in newList" :key="item.id">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="play-circle-o" class="play-icon"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
//目标:铺设推荐歌单
// 1. van-row和van-col来搭建外框布局
// 2. van-col里内容(van-image和p)
// 3.调整间距和属性值
// 4.调用封装的api/index.js-推荐歌单api方法
// 5.拿到数据保存到data里变量-去上面循环标签

//目标:铺设最新音乐
//1. van-cell铺设一套标签结构
//2.自定义右侧插槽里小图标,调整垂直居中
//3. api/Home.js和api/index.js-封装导出获取最新音乐接口方法
//4.获取数据循环铺设页面即可
import {recommendMusicAPI,newMusicAPI} from "@/apis"
export default {
  data () {
    return {
      reList:[],//推荐歌单
      newList:[],
    }
  },
  async created () {
    const res1=await recommendMusicAPI({
      limit:6
    })
    // console.log(res1.data.result);
    this.reList=res1.data.result;

    const res2=await newMusicAPI({
      limit:20
    })
    console.log(res2.data.result);
    this.newList=res2.data.result;
  },
}
</script>

<style scoped> 
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: rgb(103, 189, 204);
  color: rgb(84, 24, 212);
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.play-icon {
  font-size: 20px;
  margin-top: 12px;
}
.van-cell{
  border-bottom: 1px solid lightgray;
}
</style>