import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home.vue')

  },
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
  },
// /
  { path: '/login',     name: 'login',    component: () => import('../views/login'), meta: {title: 'Login'}},
  { path: '/register',  name: 'register', component: () => import('../views/register'), meta: {title: 'Register'}},
  { path: '/profile',   name: 'profile',  component: () => import('../views/profile'), meta: {title: 'Profile'}},
  { path: '/users',     name: 'users',    component: () => import('../views/users-list'), meta: {title: 'Users List'}}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
