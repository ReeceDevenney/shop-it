<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue"
import Header from "../components/Header.vue"

const test = ["this is some sample text", "longet text", "testing testing", "one more test", "and another one", "asdfasdfasdf", "asdfasdfafd"]
</script>

<template>
    <Header />
    <v-main>
        <v-row class="d-flex justify-center ma-2">
            <v-col v-for="(num, index) in test" cols="2">
                <ProductCard :product="num" :index="index" />
            </v-col>
        </v-row>
    </v-main>
</template>