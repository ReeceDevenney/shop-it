<script setup lang="ts">
import Header from "../components/Header.vue"
import CheckoutCard from "../components/CheckoutCard.vue"
let test = localStorage.getItem("cart")
let cart = []
if (test) {
    cart = JSON.parse(test)
}

</script>

<template>
    <Header />
    <v-main>
        <CheckoutCard v-for="item in cart" :imageUrl="item.imageUrl" :productName="item.productName" :price="item.price" />
        <div v-if="!cart[0]" class="d-flex justify-center ma-4">no items in cart</div>
    </v-main>
</template>