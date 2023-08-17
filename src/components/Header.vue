<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

let items = [{ title: 'Dashboard' },
{ title: 'Logout' }]

const componentKey = ref(0);

const forceRerender = () => {
    componentKey.value += 1;
};

const logout = (forceRerender: Function) => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
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
                <input type="text" id="searchbar" class="pl-2 w-100 rounded" placeholder="search" autofocus>
            </v-col>
            <v-col v-if="user" cols="2" class="d-flex justify-center" :key="componentKey">
                <v-btn class="ml-10">
                    {{ user?.displayName }}
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item>
                                <RouterLink :to="`/dashboard/${user?.displayName}`">
                                    <v-list-item-title>Dashboard</v-list-item-title>
                                </RouterLink>
                            </v-list-item>
                            <RouterLink to="/" class="ma-2 pa-2 rounded-shaped">
                                <v-list-item @click="logout(forceRerender)">
                                    <v-list-item-title>Logout</v-list-item-title>
                                </v-list-item>
                            </RouterLink>
                        </v-list>
                    </v-menu>
                </v-btn>
            </v-col>
            <v-col v-else cols="2" class="d-flex justify-center">
                <RouterLink to="/Login" class="ma-2 pa-2">
                    <v-btn color="black">Login</v-btn>
                </RouterLink>
            </v-col>
            <v-col cols="" class="d-flex justify-center">
                <RouterLink to="/cart" class="ma-2 pa-2 rounded-shaped">
                    <v-sheet class="ma-2 pa-2">
                        <v-btn color="black">Cart</v-btn>
                    </v-sheet>
                </RouterLink>
            </v-col>
        </v-row>
    </v-app-bar>
</template>