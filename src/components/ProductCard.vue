<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps(["product", "index", "price", "image"])

</script>

<template>
    <RouterLink :to="`/product/${index}`">
        <VImg :src="image" class="resize"></VImg>
        <h2>{{ product }}</h2>
        <p>{{ price }}</p>
    </RouterLink>
</template>
