<script setup lang="ts">
defineProps(["order"])
</script>

<template>
    <v-row class="d-flex justify-space-between my-2 mx-16 pa-2">
        <v-col cols="2">
            <v-img :src="order.image" class="resize"></v-img>
        </v-col>
        <v-col cols="7" class="mr-16">
            <p>{{ order.productName }}</p>
        </v-col>
        <v-col cols="2">
            <p>${{ order.price }}</p>
            <p v-if="order.shipped">Shipped</p>
            <p v-else>Ordered</p>
        </v-col>
        <v-divider></v-divider>
    </v-row>
</template>