// 统一管理home页面中所有需要的url地址,封装网络请求的方法并导出
import request from "@/utils/request"

// 按需导出--首页--推荐歌单
export const recommendMusic = (params) =>
  request({
    url: "/personalized",
    params,
  });

// 最新音乐
export const newMusic = (params) =>
  request({
    url: "/personalized/newsong",
    params,
});