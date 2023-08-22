<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const password = ref('')
const email = ref('')
const badLogin = ref(false)

const auth = getAuth();
const login = (event: Event) => {
    if (email.value === "" || password.value === "") {
        alert("please fill out both fields to login")
        return
    }
    event?.preventDefault
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if (user) {
                console.log(user, "user test")
                window.location.href = '/'
            }
        })
        .catch((error) => {
            badLogin.value = true

        });
}





</script>

<template>
    <div class="d-flex justify-center mb-2">
        <input placeholder="Email" class="w-75 rounded" v-model="email">
    </div>
    <div class="d-flex justify-center flex-column align-center mb-2">
        <input placeholder="Password" class="w-75 rounded" type="password" v-model="password">
        <p v-if="badLogin">incorrect username or password</p>
    </div>
    <div class="d-flex justify-center">
        <v-btn class="ma-auto" color="grey" @click="login">Login</v-btn>
    </div>
</template>