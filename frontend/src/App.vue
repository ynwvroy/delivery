<template>
  <div class="container">
    <header class="header">
      <h1>🛒 Grocery Delivery</h1>

      <div class="nav">
        <router-link to="/products">Products</router-link>
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
        <router-link v-if="isLoggedIn" to="/cart">
          Cart <span v-if="cartCount">({{ cartCount }})</span>
        </router-link>
        <router-link v-if="isLoggedIn" to="/checkout">Checkout</router-link>
        <router-link v-if="isLoggedIn" to="/orders">Orders</router-link> <!-- ✅ ADDED -->
        <button v-if="isLoggedIn" @click="logout">Logout</button>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      cartCount: 0
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token')
    }
  },
  created() {
    this.updateCartCount()
    window.addEventListener('storage', this.updateCartCount)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateCartCount)
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('cart')
      this.$router.push('/login')
    },
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    }
  }
}
</script>

<style>
.container {
  font-family: sans-serif;
  padding: 1rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav {
  display: flex;
  gap: 1rem;
}
button {
  background: #ef233c;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}
</style>