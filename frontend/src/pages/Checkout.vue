<template>
  <div class="checkout-page">
    <h2>🧾 Checkout</h2>

    <form @submit.prevent="placeOrder">
      <div>
        <label>Name:</label>
        <input v-model="name" type="text" required />
      </div>

      <div>
        <label>Phone:</label>
        <input v-model="phone" type="tel" required />
      </div>

      <div>
        <label>Address:</label>
        <textarea v-model="address" required></textarea>
      </div>

      <h3>Cart Summary</h3>
      <ul>
        <li v-for="item in cart" :key="item._id">
          {{ item.name }} × {{ item.quantity }} — ${{ (item.price * item.quantity).toFixed(2) }}
        </li>
      </ul>
      <p><strong>Total:</strong> ${{ total }}</p>

      <button type="submit">✅ Place Order</button>
    </form>

    <div v-if="orderPlaced" class="success">
      ✅ Order placed! We'll deliver it soon.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
      name: '',
      phone: '',
      address: '',
      cart: [],
      orderPlaced: false
    }
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    }
  },
  created() {
    const data = localStorage.getItem('cart')
    this.cart = data ? JSON.parse(data) : []
  },
  methods: {
    async placeOrder() {
      if (!this.name || !this.phone || !this.address) {
        alert('Please fill all fields')
        return
      }

      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            phone: this.phone,
            address: this.address,
            items: this.cart
          })
        })

        if (!response.ok) {
          throw new Error('Failed to place order')
        }

        // Clear cart and show confirmation
        localStorage.removeItem('cart')
        this.cart = []
        this.orderPlaced = true
      } catch (err) {
        alert('❌ Error placing order. Please try again.')
        console.error(err)
      }
    }
  }
}
</script>

<style>
.checkout-page {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}
form > div {
  margin-bottom: 1rem;
}
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #38b000;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.success {
  margin-top: 1rem;
  background: #d8f3dc;
  padding: 1rem;
  border-radius: 5px;
  color: #2b9348;
}
</style>