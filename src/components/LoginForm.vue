<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const password = ref('')
const email = ref('')

const auth = getAuth();
const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error")
        });
}





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
            <v-btn class="ma-auto" color="grey" @click="login">Login</v-btn>
        </RouterLink>
    </div>
</template>