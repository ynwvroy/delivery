<template>
  <div class="cart-page">
    <h2>🛍️ Your Cart</h2>

    <div v-if="cart.length === 0">
      <p>Your cart is empty.</p>
      <router-link to="/products">Browse Products</router-link>
    </div>

    <div v-else>
      <div v-for="item in cart" :key="item._id" class="cart-item">
        <img :src="item.image" alt="Product" />
        <div class="info">
          <h3>{{ item.name }}</h3>
          <p>${{ item.price.toFixed(2) }}</p>
          <div class="quantity">
            <button @click="decreaseQty(item)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQty(item)">+</button>
          </div>
          <button class="remove" @click="removeItem(item._id)">🗑 Remove</button>
        </div>
      </div>

      <div class="summary">
        <p><strong>Total:</strong> ${{ total }}</p>
        <router-link class="checkout" to="/checkout">Proceed to Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cart: []
    }
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    }
  },
  created() {
    const saved = localStorage.getItem('cart')
    this.cart = saved ? JSON.parse(saved) : []
  },
  methods: {
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
      window.dispatchEvent(new Event('storage')) // 🔄 update cart count
    },
    increaseQty(item) {
      item.quantity += 1
      this.saveCart()
    },
    decreaseQty(item) {
      if (item.quantity > 1) {
        item.quantity -= 1
        this.saveCart()
      } else {
        this.removeItem(item._id)
      }
    },
    removeItem(id) {
      this.cart = this.cart.filter(i => i._id !== id)
      this.saveCart()
    }
  }
}
</script>

<style>
.cart-page {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}
.cart-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 0.8rem;
  border-radius: 8px;
  background: #fff;
}
.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.info {
  flex: 1;
}
.quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.quantity button {
  width: 30px;
  height: 30px;
  font-size: 1rem;
}
.remove {
  margin-top: 0.5rem;
  background: #ccc;
  padding: 0.4rem 0.6rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.summary {
  margin-top: 1rem;
  text-align: right;
}
.checkout {
  display: inline-block;
  margin-top: 1rem;
  background: #38b000;
  color: white;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  border-radius: 5px;
}
</style>