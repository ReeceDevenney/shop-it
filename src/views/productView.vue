<script setup lang="ts">
import Header from "../components/Header.vue"

</script>

<template>
    <Header />
    <v-main>
        <v-row>
            <v-col cols="3" class="ma-10">
                <VImg src="https://placehold.co/400x400"></VImg>
            </v-col>
            <v-col cols="3" class="ma-10">
                <h2>Title</h2>
                <p>price</p>
                <v-btn>add to cart</v-btn>
            </v-col>
        </v-row>
    </v-main>
</template>