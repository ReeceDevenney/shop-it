<script setup lang="ts">
import Header from "../components/Header.vue"
import { doc, getDoc } from "firebase/firestore";
import db from "../firebaseInit"
import { ref, onBeforeMount } from "vue"

const url = window.location.href
const split = url.split("/")
const productId = split[split.length - 1]

let loading = ref(true)

const product = ref()
const docRef = doc(db, "Products", productId);
const getProduct = async (product: any) => {
    let docSnap = await getDoc(docRef);
    product.value = docSnap.data()
    if (product.value) {
        loading.value = false
    }
}
onBeforeMount(() => getProduct(product))

const addToCart = () => {
    if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", JSON.stringify([product.value]))
    } else {
        let holder = JSON.parse(localStorage.getItem("cart"))
        holder.push(product.value)
        localStorage.setItem("cart", JSON.stringify(holder))
    }
}

</script>

<template>
    <Header />
    <v-main v-if="loading">
        <div>loading...</div>
    </v-main>
    <v-main v-else>
        <v-row>
            <v-col cols="3" class="ma-10">
                <VImg :src=product.imageUrl>
                </VImg>
            </v-col>
            <v-col cols="5" class="ma-10">
                <h2 class="mb-5">{{ product.productName }}</h2>
                <p class="mb-5">{{ product.description }}</p>
                <p class="mb-5">${{ product.price }}</p>
                <v-btn @click="addToCart">add to cart</v-btn>
            </v-col>
        </v-row>
    </v-main>
</template>