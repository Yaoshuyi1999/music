import Vue from 'vue'
import App from './App.vue'
import router from "@/router";//路由对象

import "@/assets/styles/reset.css";//适配
import "@/assets/mobile/flexible.js";//初始化样式

// 这里vant导入所有组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//目标:封装网络请求
// 1. src/utils/request.js- 设置基地址,导出axios函数
// 2. src/api/Home.js -请求方法axios([url: "具体"))
// 3. src/api/index.js -把Home.js里函数引入过来统一导出I
// 4.具体逻辑页面,引入api/index.js请求方法, async+await等待axios的结果回来了

// 测试封装的api方法
import {recommendMusicAPI} from "@/apis"
async function fn(){ 
  const res=await recommendMusicAPI()
  // api方法原地会得到axios请求在原地的Promise对象(里面有一个ajax请求)
  console.log(res);
}
fn()

Vue.config.productionTip = false

// 目标: Vant组件库自动适配
// 自动让所有px转成rem (以后我们可以直接写px)- webpack配合postcss和postcss-pxtorem插件就可以翻译css代码,把px转rem使用
// 1. 下载postcss postcss-pxtorem
// 2. postcss.config.js -填入插件转换的基准值(配置可以复制md)
// 3. 一定要重启服务器,观察效果

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
