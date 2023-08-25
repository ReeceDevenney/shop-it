<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue"
import Header from "../components/Header.vue"
import ProductCard from "@/components/ProductCard.vue";
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { db, storage } from '../firebaseInit'
import OrderRecieved from '../components/OrderRecieved.vue'
import OrdersMade from '../components/OrdersMade.vue'
import { ref as firebaseRef, uploadBytes, getDownloadURL } from "firebase/storage"

// gets userId from the URL
const url = window.location.href
const split = url.split("/")
const userId = split[split.length - 1]
let loading = ref(false)

const productName = ref('')
const imageUrl = ref('')
const price = ref<number | null>()
const description = ref('')
const uploadImg: any = ref<any>({})

const auth = getAuth();
onBeforeMount(() => onAuthStateChanged(auth, (users) => {
    if (users?.uid != userId) {
        window.location.href = '/'
    } else {
        loading.value = true
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
            image: doc.data().imageUrl,
            description: doc.data().description
        }
        productsTemp.push(product)
    })
    products.value = productsTemp
})

// pulls any orders for the users product
let ordersRecieved: any = ref([])
onMounted(async () => {
    const querySnapshot = await getDocs(query(collection(db, "Orders"), where("sellerId", "==", userId), where("shipped", "==", false)));
    let recievedTemp: any = []
    querySnapshot.forEach((doc) => {
        const product = {
            id: doc.id,
            productName: doc.data().productName,
            price: doc.data().price,
            image: doc.data().imageUrl,
            address: doc.data().address,
            city: doc.data().city,
            state: doc.data().state,
            zip: doc.data().zip,
            shipped: doc.data().shipped,
        }
        recievedTemp.push(product)
    })
    ordersRecieved.value = recievedTemp
})
// pulls any orders the user has made for other products
let ordersMade: any = ref([])
onMounted(async () => {
    const querySnapshot = await getDocs(query(collection(db, "Orders"), where("buyerId", "==", userId)));
    let madeTemp: any = []
    querySnapshot.forEach((doc) => {
        const product = {
            id: doc.id,
            productName: doc.data().productName,
            price: doc.data().price,
            image: doc.data().imageUrl,
            shipped: doc.data().shipped,
        }
        madeTemp.push(product)
    })
    ordersMade.value = madeTemp
})

interface fileTypeInt {
    type: string
}

const cleanPrice = () => {
    if (price.value) {
        price.value = parseFloat((Math.round(price.value * 100) / 100).toFixed(2))
    }
}
// lets a user post a new product
const addProduct = async (fileType: fileTypeInt) => {
    console.log(fileType, "tuype")
    if (productName.value === "" || price.value === null || description.value === "" || fileType === undefined) {
        alert("please make sure all fields are filled out")
        return
    }
    if (fileType.type != "image/png" && fileType.type != "image/jpeg") {
        alert("please only upload .png and .jpeg")
        return
    }
    cleanPrice()
    const imageRef = firebaseRef(storage, `images/${Date.now()}`)
    const snapShot = await uploadBytes(imageRef, uploadImg.value.value)
    const imageURL = await getDownloadURL(snapShot.ref)
    const docRef = await addDoc(collection(db, "Products"), {
        postedBy: userId,
        productName: productName.value,
        imageUrl: imageURL,
        price: price.value,
        description: description.value
    });
    console.log("Document written with ID: ", docRef.id);

    productName.value = ''
    description.value = ''
    price.value = null
    // @ts-ignore
    document.getElementById("inputForm").value = ""
}

const priceRules = [
    (v: string) => !Number.isNaN(parseInt(v)) || 'this field must be a numbered price',
]


//controlls for opening the models for updating and deleting products
const deleteDialog = ref(false)
const editDialog = ref(false)

const productNameEdit = ref('')
const priceEdit = ref<number | null>()
const descriptionEdit = ref('')
const activeId = ref()
const activeIndex = ref(0)

const openDelete = (values: any, index: number) => {
    activeId.value = values.id
    deleteDialog.value = true
    activeIndex.value = index
    console.log()
}

const deleteDocs = async () => {
    await deleteDoc(doc(db, "Products", activeId.value));
    products.value.splice(activeIndex.value, 1)
    deleteDialog.value = false

}

const openEdit = (values: any, index: number) => {
    activeId.value = values.id
    productNameEdit.value = values.productName
    priceEdit.value = values.price
    descriptionEdit.value = values.description
    editDialog.value = true
    activeIndex.value = index
    console.log(products.value[activeIndex.value].description)
}

const confirmEdit = async () => {
    await updateDoc(doc(db, "Products", activeId.value), {
        productName: productNameEdit.value,
        price: priceEdit.value,
        description: descriptionEdit.value
    });
    products.value[activeIndex.value].productName = productNameEdit.value
    products.value[activeIndex.value].price = priceEdit.value
    products.value[activeIndex.value].description = descriptionEdit.value
    editDialog.value = false
}

</script>

<template>
    <Header />
    <v-main v-if="loading">
        <h2 class="d-flex justify-center ma-2">Your Products</h2>
        <v-row class="d-flex justify-center ma-2">
            <v-col v-for="(product, index) in products" cols="12" sm="3">
                <v-card>
                    <ProductCard :product="product?.productName" :index="product?.id" :price="product?.price"
                        :image="product?.image" />
                    <div class="d-flex justify-space-around">
                        <v-card-actions>
                            <v-btn variant="outlined" class="bg-yellow" @click="openEdit(product, index)">
                                Edit
                            </v-btn>
                            <v-dialog v-model="editDialog" width="400">
                                <v-card>
                                    <p>{{ product?.id }}</p>
                                    <v-form class="pa-2">
                                        <v-text-field label="Product Name" v-model="productNameEdit"></v-text-field>
                                        <v-text-field label="Description" v-model="descriptionEdit"></v-text-field>
                                        <v-text-field label="Price" type="number" v-model="priceEdit"></v-text-field>
                                        <v-card-actions>
                                            <v-btn color="green" block @click="confirmEdit()">Update</v-btn>
                                        </v-card-actions>
                                    </v-form>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
                        <v-card-actions>
                            <v-btn variant="outlined" class="bg-red" @click="openDelete(product, index)">
                                Delete
                            </v-btn>
                            <v-dialog v-model="deleteDialog" width="auto">
                                <v-card>
                                    <v-card-text>
                                        are you sure?
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="red" block @click="deleteDocs()">Yes</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
                    </div>
                </v-card>
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
                        <v-text-field label="Description" v-model="description" required></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Price" type="number" v-model="price" :rules="priceRules"
                            required></v-text-field>
                    </v-col>
                    <v-col>
                        <!-- @vue-ignore -->
                        <input class="mb-2" type="file" accept="'*.jpg, *.png'" ref="test" id="inputForm"
                            @change="($event) => { uploadImg.value = $event.target?.files[0] }" />
                    </v-col>
                </v-row>
                <v-btn class="bg-green" @click="addProduct(uploadImg.value)">Add Product</v-btn>
            </v-container>
        </v-form>
        <h2 class="d-flex justify-center">Orders Recieved</h2>
        <OrderRecieved v-for="order in ordersRecieved" :order="order" />
        <h2 class="d-flex justify-center">Orders Placed</h2>
        <OrdersMade v-for="order in ordersMade" :order="order" />
    </v-main>
</template>