<template>
  <div class="products-page">
    <h2>🛒 Available Products</h2>

    <div v-if="loading">Loading products...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="products-grid">
      <div v-for="product in products" :key="product._id" class="product-card">
        <img :src="product.image" alt="Product Image" />
        <h3>{{ product.name }}</h3>
        <p class="price">${{ product.price.toFixed(2) }}</p>
        <p class="desc">{{ product.description }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      loading: true,
      error: ''
    }
  },
  created() {
    axios
      .get('http://localhost:5000/api/products')
      .then(res => {
        this.products = res.data
      })
      .catch(() => {
        this.error = 'Failed to load products'
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      const existing = cart.find(item => item._id === product._id)

      if (existing) {
        existing.quantity += 1
      } else {
        cart.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: 1
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      window.dispatchEvent(new Event('storage')) // 🔄 Notify app of cart update
      alert('✅ Added to cart')
    }
  }
}
</script>

<style>
.products-page {
  max-width: 1000px;
  margin: auto;
  padding: 1rem;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  background: #f7fff7;
}
.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.price {
  font-weight: bold;
  color: #38b000;
}
.desc {
  font-size: 0.9rem;
  color: #555;
}
</style>