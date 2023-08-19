<script setup lang="ts">
import Header from "../components/Header.vue"
import CheckoutCard from "../components/CheckoutCard.vue"

const cart = JSON.parse(localStorage.getItem("cart"))
console.log(cart[0].imageUrl)
</script>

<template>
    <Header />
    <v-main>
        <CheckoutCard v-for="item in cart" :imageUrl="item.imageUrl" :productName="item.productName" :price="item.price" />
    </v-main>
</template>