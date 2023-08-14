<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue"
import Header from "../components/Header.vue"
import db from "../firebaseInit"
import { doc, getDoc } from 'firebase/firestore'
import { onMounted } from 'vue';

const test = ["this is some sample text", "longet text", "testing testing", "one more test", "and another one", "asdfasdfasdf", "asdfasdfafd"]
const getUsers = async () => {
    const docSnap = await getDoc(doc(db, 'Users', '6fwb4ASd2HmmvZnuSh8X'))
    if (docSnap.exists()) {
        console.log(docSnap.data())
    } else {
        console.log("whoops")
    }

}

onMounted(() => getUsers())
</script>

<template>
    <Header />
    <v-main>
        <v-row class="d-flex justify-center ma-2">
            <v-col v-for="(num, index) in test" cols="2">
                <ProductCard :product="num" :index="index" />
            </v-col>
        </v-row>
    </v-main>
</template>