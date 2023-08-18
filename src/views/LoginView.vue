<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import SignUpForm from '../components/SignUpForm.vue'
import LoginForm from '../components/LoginForm.vue'


const login = (username: string) => {
    localStorage.setItem("username", username)
    console.log(localStorage.getItem("username"))
}


const signUp = () => {
    console.log("signup")
}


let flipSwitch = ref(true)
const setLogin = () => {
    flipSwitch.value = true
}
const setSignUp = () => {
    flipSwitch.value = false
}
</script>

<template>
    <div class="d-flex justify-center mt-15">
        <div class="w-50 bg-grey-lighten-4 pa-10">
            <div class="d-flex justify-center">
                <RouterLink to="/" class="pa-2 mb-2 rounded-shaped w-75 d-flex justify-center"
                    style="text-decoration: none; color: inherit; background-color: green;">
                    Shop-It!
                </RouterLink>
            </div>
            <div class="d-flex justify-space-around">
                <v-btn variant="text" @click="setLogin">Login</v-btn>
                <v-btn variant="text" @click="setSignUp">Sign-up</v-btn>
            </div>
            <LoginForm v-if="flipSwitch"></LoginForm>
            <SignUpForm v-else></SignUpForm>
        </div>
    </div>
</template>
  
