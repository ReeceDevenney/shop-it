<script setup lang="ts">
import Header from "../components/Header.vue"
import { ref } from 'vue'
import { collection, addDoc } from "firebase/firestore";
import db from "../firebaseInit"
import { RouterLink } from 'vue-router'

const city = ref('')
const state = ref('')
const address = ref('')
const zip = ref('')

let cart = localStorage.getItem("cart")
if (cart) {
    cart = JSON.parse(cart)
}

let orderSucess = ref(false)
const btnPress = async () => {
    if (cart) {
        for (let i = 0; i < cart?.length; i++) {
            let cartitem = cart[i]
            const docRef = await addDoc(collection(db, "Orders"), {
                address: address.value,
                state: state.value,
                city: city.value,
                zip: zip.value,
                productId: cartitem.productId,
                sellerId: cartitem.postedBy,
                buyerId: "3EMMY37Dkua5UKDJnCXueFF4Lek2",
                price: cartitem.price,
                imageUrl: cartitem.imageUrl,
                productName: cartitem.productName,
            });
            if (docRef) {
                orderSucess.value = true
            }
        }
    }
    if (orderSucess.value) {
        localStorage.removeItem("cart");
    }
}
</script>

<template>
    <Header />
    <v-main class="mt-16">
        <div v-if="!orderSucess">
            <div class="d-flex flex-direction: row justify-center">
                <div class="d-flex justify-center ma-2">
                    <input placeholder="City" class="rounded" v-model="city">
                </div>
                <div class="d-flex justify-center ma-2">
                    <input placeholder="State" class="rounded" v-model="state">
                </div>
            </div>
            <div class="d-flex justify-center mb-2">
                <input placeholder="Address" class="w-25 rounded" v-model="address">
            </div>
            <div class="d-flex justify-center mb-2">
                <input placeholder="Zip-Code" class="w-25 rounded" v-model="zip">
            </div>
            <div class="d-flex justify-center">
                <v-btn class="ma-auto bg-green-darken-1" @click="btnPress">Checkout</v-btn>
            </div>
        </div>
        <div v-else class="d-flex justify-center flex-column">
            <p class="d-flex justify-center">Order Sucess!</p>
            <RouterLink to="/" class="d-flex justify-center">
                <v-btn class="ma-auto bg-green-darken-1" @click="btnPress">Return Home</v-btn>
            </RouterLink>
        </div>
    </v-main>
</template>