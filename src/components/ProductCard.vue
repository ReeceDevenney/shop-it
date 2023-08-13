<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps(["product", "index"])

</script>

<template>
    <v-card>
        <RouterLink :to="`/product/${index}`">
            <VImg src="https://placehold.co/400x400"></VImg>
            <h2>Product Name</h2>
            {{ product }}
        </RouterLink>
    </v-card>
</template>
