import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Products from '../pages/Products.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import OrderHistory from '../pages/OrderHistory.vue' // ✅ new

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/products',
    component: Products,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    component: Cart,
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout',
    component: Checkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    component: OrderHistory, // ✅ added
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router