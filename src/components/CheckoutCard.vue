<script setup lang="ts">
defineProps(["imageUrl", "productName", "price"])
</script>

<template>
    <v-row class="d-flex justify-space-between my-2 mx-16 pa-2">
        <v-col cols="2">
            <v-img :src="imageUrl"></v-img>
        </v-col>
        <v-col cols="7" class="mr-16">
            <p>{{ productName }}</p>
        </v-col>
        <v-col cols="2">
            <p>${{ price }}</p>
        </v-col>
        <v-divider></v-divider>
    </v-row>
</template>