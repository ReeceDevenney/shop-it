<script setup lang="ts">
const test = ["this is some sample text", "longet text", "testing testing", "one more test", "and another one", "asdfasdfasdf", "asdfasdfafd"]
</script>

<template>
    <v-row class="d-flex justify-center ma-2">
        <v-col v-for="num in test" cols="2">
            <v-card>
                <VImg src="https://placehold.co/400x400"></VImg>
                <h2>Product Name</h2>
                {{ num }}
            </v-card>
        </v-col>
    </v-row>
</template>
