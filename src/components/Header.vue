<script setup lang="ts">
import { RouterLink } from 'vue-router'


let username: string | null = localStorage.getItem("username")
</script>

<template>
    <v-app-bar>
        <v-row no-gutters class="d-flex align-center">
            <v-col class="d-flex justify-center">
                <RouterLink to="/" class="ma-2 pa-2 rounded-shaped"
                    style="text-decoration: none; color: inherit; background-color: green;">
                    Shop-It!
                </RouterLink>
            </v-col>
            <v-col cols="6" class="d-flex align-center ma-8">
                <input type="text" id="searchbar" class="pl-2 w-100 rounded" placeholder="search" autofocus>
            </v-col>
            <v-col v-if="username" cols="2" class="d-flex justify-center">
                <RouterLink :to='`/dashboard/${username}`' class="ma-2 pa-2">
                    <v-btn color="black">{{ username }}</v-btn>
                </RouterLink>
            </v-col>
            <v-col v-else cols="2" class="d-flex justify-center">
                <RouterLink to="/Loggin" class="ma-2 pa-2">
                    <v-btn color="black">Loggin</v-btn>
                </RouterLink>
            </v-col>
            <v-col cols="" class="d-flex justify-center">
                <v-sheet class="ma-2 pa-2">
                    <v-btn color="black">Cart</v-btn>
                </v-sheet>
            </v-col>
        </v-row>
    </v-app-bar>
</template>