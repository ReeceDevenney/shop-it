<script setup lang="ts">
import { RouterView } from 'vue-router'
import db from "./firebaseInit"
import { doc, getDoc } from 'firebase/firestore'
import { onMounted } from 'vue';

const getUsers = async () => {
  const docSnap = await getDoc(doc(db, 'Users', '6fwb4ASd2HmmvZnuSh8X'))
  if (docSnap.exists()) {
    console.log(docSnap.data())
  } else {
    console.log("whoops")
  }

}

</script>

<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

