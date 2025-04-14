// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA68NpYDsg3hftHTYdwCo5eYZgT8M5jrB8",
    authDomain: "portifolio-44b89.firebaseapp.com",
    projectId: "portifolio-44b89",
    storageBucket: "portifolio-44b89.firebasestorage.app",
    messagingSenderId: "108843546582",
    appId: "1:108843546582:web:f852f50a745187d0a75677",
    measurementId: "G-FTNQZE2HJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
export const auth = getAuth(app);
export const db = getFirestore(app);