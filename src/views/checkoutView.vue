<script setup lang="ts">
import Header from "../components/Header.vue"
</script>

<template>
    <Header />
    <v-main class="mt-16">
        <div class="d-flex flex-direction: row justify-center">
            <div class="d-flex justify-center ma-2">
                <input placeholder="City" class="rounded">
            </div>
            <div class="d-flex justify-center ma-2">
                <input placeholder="State" class="rounded">
            </div>
        </div>
        <div class="d-flex justify-center mb-2">
            <input placeholder="Address" class="w-25 rounded">
        </div>
        <div class="d-flex justify-center mb-2">
            <input placeholder="Zip-Code" class="w-25 rounded">
        </div>
        <div class="d-flex justify-center">
            <v-btn class="ma-auto bg-green-darken-1">Checkout</v-btn>
        </div>
    </v-main>
</template>