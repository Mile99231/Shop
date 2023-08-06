<template>
    <div class="container">
      <h1>Shopping Cart</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <button @click="removeFromCart(item.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [
          { id: 1, name: 'Product 1', price: 10, quantity: 2 },
          { id: 2, name: 'Product 2', price: 20, quantity: 1 },
          { id: 3, name: 'Product 3', price: 30, quantity: 3 },
        ],
      };
    },
    methods: {
      removeFromCart(itemId) {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      },
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 50px;
  }
  </style>