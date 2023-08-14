<script setup lang="ts">
import Header from "../components/Header.vue"
import CheckoutCard from "../components/CheckoutCard.vue"

</script>

<template>
    <Header />
    <v-main>
        <CheckoutCard v-for="n in 4" />
    </v-main>
</template>