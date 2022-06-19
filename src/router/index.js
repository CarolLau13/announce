import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home.vue')
const login = () => import('../views/login.vue')
const admin = () => import('../views/admin.vue')
const dashboard = () => import('../views/dashboard.vue')
const announceManage = () => import('../views/announceManage.vue')
const userManagement = () => import('../views/userManagement.vue')
const modifyPassword = () => import('../views/modifyPassword.vue')

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
    path: '/admin',
    component: admin,
    children: [
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: '/admin/dashboard',
        component: dashboard
      },
      {
        path: '/announceManage',
        component: announceManage
      },
      {
        path: '/userManagement',
        component: userManagement
      },
    ]
  },
  {
    path: '/modifyPassword',
    component: modifyPassword
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3.导出router
export default router