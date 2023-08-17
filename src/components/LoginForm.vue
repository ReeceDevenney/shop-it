<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'


const password = ref('')
const email = ref('')


</script>

<template>
    <div class="d-flex justify-center mb-2">
        <input placeholder="Email" class="w-75 rounded" v-model="email">
    </div>
    <div class="d-flex justify-center mb-2">
        <input placeholder="Password" class="w-75 rounded" v-model="password">
    </div>
    <div class="d-flex justify-center">
        <RouterLink to="/" class="ma-2 pa-2">
            <v-btn class="ma-auto" color="grey">Login</v-btn>
        </RouterLink>
    </div>
</template>