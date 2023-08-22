<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onBeforeMount } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebaseInit'

const auth = getAuth();
let user = ref(auth.currentUser);

onBeforeMount(() => onAuthStateChanged(auth, (users) => {
    if (users) {
        user.value = users
    }
}))


let items = [{ title: 'Dashboard' },
{ title: 'Logout' }]

const logout = async () => {
    await signOut(auth).then(() => {
        user.value = auth.currentUser
        console.log(user, "inner")
    }).catch((error) => {
        // An error happened.
    });
    console.log(user, "outter")

}

const searchInput = ref("")
const searchBar = async (event: Event) => {
    event.preventDefault()
    console.log(searchInput)
    const querySnapshot = await getDocs(query(collection(db, "Products"), where("productName", "==", searchInput.value)));
    if (querySnapshot) {
        querySnapshot.forEach((doc) => {
            window.location.href = `product/${doc.id}`
        });

    }
}

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
                <form @submit="searchBar($event)" class="pl-2 w-100 rounded">
                    <input type="text" id="searchbar" class="pl-2 w-100 rounded" placeholder="search" v-model="searchInput"
                        autofocus>
                </form>
            </v-col>
            <v-col v-if="user" cols="2" class="d-flex justify-center">
                <v-btn class="ml-10">
                    {{ user?.displayName }}
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item>
                                <RouterLink :to="`/dashboard/${user?.uid}`">
                                    <v-list-item-title>Dashboard</v-list-item-title>
                                </RouterLink>
                            </v-list-item>
                            <RouterLink to="/" class="ma-2 pa-2 rounded-shaped">
                                <v-list-item @click="logout()">
                                    <v-list-item-title>Logout</v-list-item-title>
                                </v-list-item>
                            </RouterLink>
                        </v-list>
                    </v-menu>
                </v-btn>
            </v-col>
            <v-col v-else cols="3" class="d-flex justify-center">
                <RouterLink to="/Login" class="ma-2 pa-2">
                    <v-btn color="black">Login</v-btn>
                </RouterLink>
            </v-col>
            <v-col v-if="user" cols="" class="d-flex justify-center">
                <RouterLink to="/cart" class="ma-2 pa-2 rounded-shaped">
                    <v-sheet class="ma-2 pa-2">
                        <v-btn color="black">Cart</v-btn>
                    </v-sheet>
                </RouterLink>
            </v-col>
        </v-row>
    </v-app-bar>
</template>