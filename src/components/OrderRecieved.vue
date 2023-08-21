<script setup lang="ts">
defineProps(["order"])
</script>

<template>
    <v-row class="d-flex justify-space-between my-2 mx-16 pa-2">
        <v-col cols="2">
            <v-img src="https://placehold.co/400x400"></v-img>
        </v-col>
        <v-col cols="7" class="mr-16">
            <p>{{ order.productName }}</p>
            <h4>Shipping Address</h4>
            <p>{{ order.city }}, {{ order.state }}</p>
            <p>{{ order.address }}, {{ order.zip }}</p>
        </v-col>
        <v-col cols="2">
            <p>${{ order.price }}</p>
            <p>status</p>
        </v-col>
        <v-divider></v-divider>
    </v-row>
</template>