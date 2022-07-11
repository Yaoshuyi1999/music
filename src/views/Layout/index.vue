<template>
<!-- 负责布局（上下导航，以及中间动态部分） -->
  <div>
    <van-nav-bar :title="$route.meta.title" fixed/>
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" replace to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/layout/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>

<style>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>