<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue"
import Header from "../components/Header.vue"
import db from "../firebaseInit"
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'
import { onMounted, ref } from 'vue';

let products: any = ref([])
onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    let productsTemp: any = []
    querySnapshot.forEach((doc) => {
        const product = {
            id: doc.id,
            title: doc.data().title,
            price: doc.data().price,
        }
        productsTemp.push(product)
    })
    products.value = productsTemp
})
</script>

<template>
    <Header />
    <v-main>
        <v-row class="d-flex justify-center ma-2">
            <v-col v-for="product in products" cols="2">
                <ProductCard :product="product?.title" :index="product?.id" :price="product?.price" />
            </v-col>
        </v-row>
    </v-main>
</template>