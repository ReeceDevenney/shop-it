<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue"
import Header from "../components/Header.vue"
import ProductCard from "@/components/ProductCard.vue";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import db from '../firebaseInit'

// gets userId from the URL
const url = window.location.href
const split = url.split("/")
const userId = split[split.length - 1]

const auth = getAuth();
let user = ref(auth.currentUser);
onBeforeMount(() => onAuthStateChanged(auth, (users) => {
    if (users?.uid != userId) {
        window.location.href = '/'
    }
}))



// pulls any products posted by the user
let products: any = ref([])
onMounted(async () => {
    const querySnapshot = await getDocs(query(collection(db, "Products"), where("postedBy", "==", userId)));
    let productsTemp: any = []
    querySnapshot.forEach((doc) => {
        const product = {
            id: doc.id,
            productName: doc.data().productName,
            price: doc.data().price,
        }
        productsTemp.push(product)
    })
    products.value = productsTemp
})

let productName = ref('')
let imageUrl = ref('')
let price = ref<number | null>()
let description = ref('')

// lets a user post a new product
const addProduct = async () => {
    const docRef = await addDoc(collection(db, "Products"), {
        postedBy: userId,
        productName: productName.value,
        imageUrl: imageUrl.value,
        price: price.value,
        description: description.value
    });
    console.log("Document written with ID: ", docRef.id);

    productName.value = ''
    imageUrl.value = ''
    description.value = ''
    price.value = null
}

const priceRules = [
    (v: string) => !Number.isNaN(parseInt(v)) || 'this field must be a numbered price',
]

</script>

<template>
    <Header />
    <v-main>
        <h2 class="d-flex justify-center ma-2">Your Products</h2>
        <v-row class="d-flex justify-center ma-2">
            <v-col v-for="product in products" cols="2">
                <ProductCard :product="product?.productName" :index="product?.id" :price="product?.price" />
                <div class="d-flex justify-space-around">
                    <v-btn class="ma-1 bg-yellow-lighten-2">edit</v-btn>
                    <v-btn class="ma-1 bg-red-darken-4">delete</v-btn>
                </div>
            </v-col>
        </v-row>
        <h2 class="d-flex justify-center ma-2">Add A New Product!</h2>
        <v-form>
            <v-container>
                <v-row class="d-flex justify-center flex-column">
                    <v-col>
                        <v-text-field label="Product Name" v-model="productName" required></v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field label="Image URL" v-model="imageUrl" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="description" v-model="description" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Price" v-model="price" :rules="priceRules" required></v-text-field>
                    </v-col>
                </v-row>
                <v-btn class="bg-green" @click="addProduct">Add Product</v-btn>
            </v-container>
        </v-form>
    </v-main>
</template>