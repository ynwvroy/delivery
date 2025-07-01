import { createRouter, createWebHistory } from 'vue-router'

// Import pages
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Products from '../pages/Products.vue'

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', component: Products },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router