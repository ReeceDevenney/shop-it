<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue"
import Header from "../components/Header.vue"
import { db } from "../firebaseInit"
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'
import { onBeforeMount, ref } from 'vue';


interface productShape {
    productName: string,
    image: string,
}

let products: any = ref([])
onBeforeMount(async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    let productsTemp: any = []
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        const product = {
            id: doc.id,
            productName: doc.data().productName,
            price: doc.data().price,
            image: doc.data().imageUrl
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
            <v-col v-for="product in products" cols="12" sm="3">
                <v-card>
                    <ProductCard :product="product?.productName" :index="product?.id" :price="product?.price"
                        :image="product?.image" />
                </v-card>
            </v-col>
        </v-row>
    </v-main>
</template>
