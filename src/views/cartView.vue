<script setup lang="ts">
import Header from "../components/Header.vue"
import CheckoutCard from "../components/CheckoutCard.vue"
import { ref } from "vue"
let localCart = localStorage.getItem("cart")
const cart: any = ref([])
if (localCart) {
    cart.value = JSON.parse(localCart)
}
let total = 0
for (let i = 0; i < cart.value.length; i++) {
    total += parseFloat(cart.value[i].price)
}

const removeFromCart = (index: number) => {
    cart.value.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart.value))
}
</script>

<template>
    <Header />
    <v-main>
        <div v-if="!cart[0]" class="d-flex justify-center ma-4">no items in cart</div>
        <div v-else>
            <CheckoutCard @remove="removeFromCart(index)" v-for="(item, index) in cart" :imageUrl="item.imageUrl"
                :productName="item.productName" :price="item.price" />
            <v-row class="d-flex justify-space-between my-2 mx-16 pa-2">
                <v-col cols="9">
                    <v-img></v-img>
                </v-col>
                <v-col cols="2">
                    <p>total: ${{ total }}</p>
                    <v-btn class="bg-green-darken-1">checkout</v-btn>
                </v-col>
            </v-row>
        </div>
    </v-main>
</template>