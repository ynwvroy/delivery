<template>
    <div class="orders-page">
      <h2>📦 Your Orders</h2>
  
      <div v-if="loading">Loading your orders...</div>
      <div v-if="error" class="error">{{ error }}</div>
  
      <div v-if="orders.length === 0 && !loading">
        <p>You haven’t placed any orders yet.</p>
        <router-link to="/products">Browse Products</router-link>
      </div>
  
      <div v-for="order in orders" :key="order._id" class="order-card">
        <p><strong>📅 Date:</strong> {{ formatDate(order.createdAt) }}</p>
        <p><strong>👤 Name:</strong> {{ order.name }}</p>
        <p><strong>📞 Phone:</strong> {{ order.phone }}</p>
        <p><strong>🏠 Address:</strong> {{ order.address }}</p>
  
        <ul>
          <li v-for="item in order.items" :key="item._id">
            {{ item.name }} × {{ item.quantity }} — ${{ (item.price * item.quantity).toFixed(2) }}
          </li>
        </ul>
  
        <p><strong>Total:</strong> ${{ order.total.toFixed(2) }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'OrderHistory',
    data() {
      return {
        orders: [],
        loading: true,
        error: ''
      }
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleString()
      }
    },
    created() {
      const token = localStorage.getItem('token')
      axios
        .get('http://localhost:5000/api/orders/history', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.orders = res.data
        })
        .catch(() => {
          this.error = 'Failed to load your orders.'
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
  </script>
  
  <style>
  .orders-page {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
  }
  .order-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    background: #f1fdf3;
  }
  ul {
    margin: 0.5rem 0;
    padding-left: 1.2rem;
  }
  .error {
    color: red;
  }
  </style>  