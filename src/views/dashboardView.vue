<script setup lang="ts">
import Header from "../components/Header.vue"
import ProductCard from "@/components/ProductCard.vue";

const products = ["this is some sample text", "longet text", "testing testing", "one more test", "and another one", "asdfasdfasdf"]
</script>

<template>
    <Header />
    <v-main>
        <h2 class="d-flex justify-center ma-2">Your Products</h2>
        <v-row class="d-flex justify-center ma-2">
            <v-col v-for="product in products" cols="2">
                <ProductCard :product="product" />
                <div class="d-flex justify-space-around">
                    <v-btn class="ma-1 bg-yellow-lighten-2">edit</v-btn>
                    <v-btn class="ma-1 bg-red-darken-4">delete</v-btn>
                </div>
            </v-col>
        </v-row>
        <h2 class="d-flex justify-center ma-2">Add A New Product!</h2>
        <v-form>
            <v-container>
                <v-row class="d-flex justify-center flex-column">
                    <v-col>
                        <v-text-field label="Product Name" required></v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field label="Image URL" required></v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field label="Price" required></v-text-field>
                    </v-col>
                </v-row>
                <v-btn class="bg-green">Add Product</v-btn>
            </v-container>
        </v-form>
    </v-main>
</template>