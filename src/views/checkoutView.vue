<script setup lang="ts">
import Header from "../components/Header.vue"
import { ref, onBeforeMount } from 'vue'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseInit"
import { RouterLink } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const auth = getAuth()
let userId: string = ""
onBeforeMount(() => onAuthStateChanged(auth, (users) => {
    if (!users?.uid) {
        window.location.href = '/'
    } else {
        userId = users?.uid
    }
}))

const city = ref('')
const state = ref('')
const address = ref('')
const zip = ref('')

interface cartShape {
    productId: string,
    postedBy: string,
    price: string,
    imageUrl: string,
    productName: string,
}
const cartStorage = localStorage.getItem("cart")
let cart: Array<cartShape> = []
if (cartStorage != null) {
    cart = JSON.parse(cartStorage)
}


let orderSucess = ref(false)
const btnPress = async () => {
    if (city.value === "", state.value === "", address.value === "", zip.value === "") {
        alert("please make sure all fields are filled out")
        return
    }
    if (cart) {
        for (let i = 0; i < cart?.length; i++) {
            const docRef = await addDoc(collection(db, "Orders"), {
                address: address.value,
                state: state.value,
                city: city.value,
                zip: zip.value,
                productId: cart[i].productId,
                sellerId: cart[i].postedBy,
                buyerId: userId,
                price: cart[i].price,
                imageUrl: cart[i].imageUrl,
                productName: cart[i].productName,
                shipped: false
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
                <input placeholder="Zip-Code" class="w-25 rounded" v-model="zip" type="number">
            </div>
            <div class="d-flex justify-center">
                <v-btn class="ma-auto bg-green-darken-1" @click="btnPress">Checkout</v-btn>
            </div>
        </div>
        <div v-else class="d-flex justify-center flex-column">
            <p class="d-flex justify-center">Order Sucess!</p>
            <RouterLink to="/" class="d-flex justify-center">
                <v-btn class="ma-auto bg-green-darken-1">Return Home</v-btn>
            </RouterLink>
        </div>
    </v-main>
</template>