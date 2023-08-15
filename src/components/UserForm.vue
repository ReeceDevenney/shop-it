<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

defineProps(["title", "formFunction"])

const username = ref('')
const Password = ref('')

const setUsername = () => {
    localStorage.setItem("username", username.value)
    console.log(localStorage.getItem("username"))
}

</script>

<template>
    <div class="d-flex justify-center mb-2">
        <input placeholder="UserName" class="w-75 rounded" v-model="username">
    </div>
    <div class="d-flex justify-center mb-2">
        <input placeholder="Password" class="w-75 rounded" v-model="Password">
    </div>
    <div class="d-flex justify-center">
        <RouterLink to="/" class="ma-2 pa-2">
            <v-btn class="ma-auto" color="grey" @click="formFunction()">{{ title }}</v-btn>
        </RouterLink>
    </div>
</template>