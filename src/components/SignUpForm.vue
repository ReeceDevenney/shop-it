<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const username = ref('')
const password = ref('')
const email = ref('')

const auth = getAuth();
const test = async () => {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    if (auth.currentUser) {
        updateProfile(auth.currentUser, {
            displayName: username.value
        }).then(() => {
            window.location.href = '/'
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

}
</script>

<template>
    <div class="d-flex justify-center mb-2">
        <input placeholder="UserName" class="w-75 rounded" v-model="username">
    </div>
    <div class="d-flex justify-center mb-2">
        <input placeholder="Email" class="w-75 rounded" v-model="email">
    </div>
    <div class="d-flex justify-center mb-2">
        <input placeholder="Password" class="w-75 rounded" v-model="password">
    </div>
    <div class="d-flex justify-center">
        <v-btn class="ma-auto" color="grey" @click="test()">Sign Up</v-btn>
    </div>
</template>