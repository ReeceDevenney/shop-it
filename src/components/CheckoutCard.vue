<script setup lang="ts">
defineProps(["imageUrl", "productName", "price", "keys"])
</script>

<template>
    <v-row class="d-flex justify-space-between my-2 mx-16 pa-2">
        <v-col cols="2">
            <v-img :src="imageUrl" class="resize"></v-img>
        </v-col>
        <v-col cols="2" sm="4" md="7" class="mr-16">
            <p>{{ productName }}</p>
        </v-col>
        <v-col cols="2">
            <p>${{ price }}</p>
            <p @click="$emit('remove')" class="row-pointer">remove</p>
        </v-col>
        <v-divider></v-divider>
    </v-row>
</template>

<style scoped>
.row-pointer {
    cursor: pointer;
}
</style>