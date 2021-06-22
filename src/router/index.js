import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Order from '../components/orders'
import addOrder from '../components/add-order'
import editOrder from '../components/edit-order'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: Order
  },
  {
    path: '/orders/new',
    name: 'add-order',
    component: addOrder
  },
  {
    path: '/order/:id',
    name: 'edit-order',
    component: editOrder
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../components/products')
  },
  {
    path: '/products/new',
    name: 'add-product',
    component: () => import('../components/add-product')
  },
  {
    path: '/product/:id',
    name: 'edit-product',
    component: () => import('../components/edit-product')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
