<template>
    <div class="auth-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      async handleLogin() {
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: this.email,
            password: this.password
          })
          const { token } = res.data
          localStorage.setItem('token', token)
          this.$router.push('/products')
        } catch (err) {
          this.error = 'Invalid credentials'
        }
      }
    }
  }
  </script>
  
  <style>
  .auth-container {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
  }
  input {
    display: block;
    margin: 0.5rem 0;
    padding: 0.5rem;
    width: 100%;
  }
  button {
    padding: 0.5rem 1rem;
    background: #38b000;
    color: white;
    border: none;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>  