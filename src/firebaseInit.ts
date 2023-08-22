// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8rPPpkhPx4XypL6_My38lNCTdK3bT-Z0",
    authDomain: "shop-it-ac92e.firebaseapp.com",
    projectId: "shop-it-ac92e",
    storageBucket: "shop-it-ac92e.appspot.com",
    messagingSenderId: "628128627962",
    appId: "1:628128627962:web:b9aa108077fd79479edd43",
    measurementId: "G-CH9QD1GMLD"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()
const storage = getStorage()

export { db, storage }
