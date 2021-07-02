import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home.vue')

  },
    //
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/profile/profile')

  },
    //
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../components/orders/orders')
    //<!--  Forzar push-->
  },
  {
    path: '/orders/new',
    name: 'add-order',
    component: () => import('../components/orders/add-order')
  },
  {
    path: '/order/:id',
    name: 'edit-order',
    component: () => import('../components/orders/edit-order')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../components/products/products')
  },
  {
    path: '/products/new',
    name: 'add-product',
    component: () => import('../components/products/add-product')
  },
  {
    path: '/product/:id',
    name: 'edit-product',
    component: () => import('../components/products/edit-product')
  },
// /
  {
    path: '/',
    name: 'index',
    component: index
  },
    //

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
