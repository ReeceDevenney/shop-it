<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue"
import Header from "../components/Header.vue"
import { RouterLink } from 'vue-router'

const test = ["this is some sample text", "longet text", "testing testing", "one more test", "and another one", "asdfasdfasdf", "asdfasdfafd"]
</script>

<template>
    <Header />
    <v-main>
        <v-row class="d-flex justify-center ma-2">
            <v-col v-for="num in test" cols="2">
                <ProductCard :product="num" />
            </v-col>
        </v-row>
    </v-main>
</template>