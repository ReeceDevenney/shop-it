<script setup lang="ts">
defineProps(["product"])

</script>

<template>
    <v-card>
        <VImg src="https://placehold.co/400x400"></VImg>
        <h2>Product Name</h2>
        {{ product }}
    </v-card>
</template>
