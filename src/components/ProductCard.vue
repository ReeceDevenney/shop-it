<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps(["product", "index", "price"])

</script>

<template>
    <v-card>
        <RouterLink :to="`/product/${index}`">
            <VImg src="https://placehold.co/400x400"></VImg>
            <h2>{{ product }}</h2>
            <p>{{ price }}</p>
        </RouterLink>
    </v-card>
</template>
