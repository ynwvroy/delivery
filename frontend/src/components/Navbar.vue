<template>
    <nav class="navbar">
      <router-link to="/products">🛒 Products</router-link>
      <router-link to="/cart">🛍️ Cart ({{ cartCount }})</router-link>
      <router-link to="/checkout">💳 Checkout</router-link>
      <button v-if="isLoggedIn" @click="logout">🚪 Logout</button>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        cartCount: 0,
        isLoggedIn: false
      }
    },
    created() {
      this.updateCartCount()
      this.isLoggedIn = !!localStorage.getItem('token')
      window.addEventListener('storage', this.updateCartCount)
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
    },
    beforeUnmount() {
      window.removeEventListener('storage', this.updateCartCount)
    }
  }
  </script>
  
  <style>
  .navbar {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #f0f4f8;
  }
  .navbar a,
  .navbar button {
    text-decoration: none;
    color: #333;
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }
  </style>  