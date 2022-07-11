// 路由配置
import VueRouter from 'vue-router'
import Vue from "vue";

import Layout from "@/views/Layout";
import Home from "@/views/Home";
import Search from "@/views/Search";
import Play from "@/views/Play";

Vue.use(VueRouter)

const routes=[
    {
        path: "/",
        redirect: "/layout/home",
    },
    {
        path: "/layout",
        component: Layout,
        children: [
            {
                path: "/layout/home",
                component: Home,
                meta: {
                    title: "首页",
                },
            },
            {
                path: "/layout/search",
                component: Search,
                meta: {
                    title: "搜索",
                },
            },
        ],
    },
    {
        path: "/play",
        component: Play,
    }
]

const router = new VueRouter({
    routes
})

//默认导出成员 
export default router;