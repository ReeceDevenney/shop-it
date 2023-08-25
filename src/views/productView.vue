<script setup lang="ts">
import Header from "../components/Header.vue"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseInit"
import { ref, onBeforeMount } from "vue"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const url = window.location.href
const split = url.split("/")
const productId = split[split.length - 1]

const auth = getAuth();
let user = ref(auth.currentUser);

onBeforeMount(() => onAuthStateChanged(auth, (users) => {
    if (users) {
        user.value = users
    }
}))

let loading = ref(true)

const product = ref()
const docRef = doc(db, "Products", productId);
// @ts-ignore
const getProduct = async (product) => {
    let docSnap = await getDoc(docRef);
    product.value = docSnap.data()
    product.value.productId = productId
    if (product.value) {
        loading.value = false
    }
}
onBeforeMount(() => getProduct(product))

const addToCart = () => {
    if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", JSON.stringify([product.value]))
    } else {
        // @ts-ignore
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
        <v-row class="">
            <v-col cols="8" sm="4" class="ma-0 ma-sm-10">
                <VImg :src="product.imageUrl" class="resize">
                </VImg>
            </v-col>
            <v-col cols="5" class="ma-10">
                <h2 class="mb-5">{{ product.productName }}</h2>
                <p class="mb-5">{{ product.description }}</p>
                <p class="mb-5">${{ product.price }}</p>
                <v-btn v-if="user" @click="addToCart">add to cart</v-btn>
                <p v-else>Login to purchase</p>
            </v-col>
        </v-row>
    </v-main>
</template>