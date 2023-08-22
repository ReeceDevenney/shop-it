<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const username = ref('')
const password = ref('')
const email = ref('')

const auth = getAuth();
const signUp = async () => {
    if (email.value === "" || password.value === "" || email.value === "") {
        alert("please fill out all fields to signup")
        return
    }
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


const badPassword = ref(false)
const passwordStr = () => {
    if (password.value.length > 0 && password.value.length < 6) {
        badPassword.value = true
    } else {
        badPassword.value = false
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
    <div class="d-flex justify-center flex-column align-center mb-2">
        <input placeholder="Password" class="w-75 rounded" type="password" v-model="password" @change="passwordStr">
        <p v-if="badPassword" class="yellow--text">Passwords must be at least 6 characters long</p>
    </div>
    <div class="d-flex justify-center">
        <v-btn class="ma-auto" color="grey" @click="signUp()">Sign Up</v-btn>
    </div>
</template>