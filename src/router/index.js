import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home.vue')
const login = () => import('../views/login.vue')
const Management = () => import('../views/management.vue')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/admin/login',
    component: login
  },
  {
    path: '/management',
    component: Management
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3.导出router
export default router