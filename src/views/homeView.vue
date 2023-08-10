<script setup lang="ts">
import cardSet from "../components/cardSet.vue"
import Header from "../components/Header.vue"
import { RouterLink } from 'vue-router'
</script>

<template>
    <Header />
    <v-main>
        <cardSet />
    </v-main>
</template>