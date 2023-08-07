<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const title = ref('')

const setUsername = () => {
    localStorage.setItem("username", title.value)
    console.log(localStorage.getItem("username"))
}

</script>

<template>
    <div class="d-flex justify-center mt-15">
        <div class="w-50 bg-grey-lighten-3 pa-10">
            <div class="d-flex justify-center">
                <RouterLink to="/" class="pa-2 mb-2 rounded-shaped w-75 d-flex justify-center"
                    style="text-decoration: none; color: inherit; background-color: green;">
                    Shop-It!
                </RouterLink>
            </div>
            <div class="d-flex justify-center mb-2">
                <input placeholder="UserName" class="w-75 rounded" ref="input" v-model="title">
            </div>
            <div class="d-flex justify-center">
                <RouterLink to="/" class="ma-2 pa-2">
                    <v-btn class="ma-auto" color="grey" @click="setUsername()">loggin</v-btn>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
  
