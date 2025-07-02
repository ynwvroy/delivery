import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Products from '../pages/Products.vue'

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/products',
    component: Products,
    meta: { requiresAuth: true } // ✅ Protect this route
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login') // Not logged in → redirect
  } else {
    next() // Allow access
  }
})

export default router