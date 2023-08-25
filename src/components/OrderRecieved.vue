<script setup lang="ts">
import { ref } from 'vue'
defineProps(["order"])
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseInit'

const confirmEdit = async (id: string) => {
    console.log(id)
    await updateDoc(doc(db, "Orders", id), {
        shipped: true
    })
    confirmDialog.value = false
}
const confirmDialog = ref(false)
</script>

<template>
    <v-row class="d-flex justify-space-between my-2 mx-16 pa-0 pa-sm-2">
        <v-col cols="2">
            <v-img :src="order.image" class="resize"></v-img>
        </v-col>
        <v-col cols="2" sm="4" md="7" class="mr-16">
            <p>{{ order.productName }}</p>
            <h4>Shipping Address</h4>
            <p>{{ order.city }}, {{ order.state }}</p>
            <p>{{ order.address }}, {{ order.zip }}</p>
        </v-col>
        <v-col cols="4" md="2">
            <p>${{ order.price }}</p>
            <p v-if="order.shipped">Shipped</p>
            <div v-else>
                <v-btn class="bg-green" @click="confirmDialog = true">Ship</v-btn>
                <v-dialog v-model="confirmDialog" width="auto">
                    <v-card>
                        <v-card-text>
                            Confirm that this product has been shipped.
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="green" block @click="confirmEdit(order.id)">Confirm</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-col>
        <v-divider></v-divider>
    </v-row>
</template>