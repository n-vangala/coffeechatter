// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD04OmG5GptW5JZp04DtQ03KkSIEDVl3sk",
  authDomain: "coffeechatter-28cad.firebaseapp.com",
  projectId: "coffeechatter-28cad",
  storageBucket: "coffeechatter-28cad.firebasestorage.app",
  messagingSenderId: "889041072998",
  appId: "1:889041072998:web:e72cdc07e99a6caab64ea7",
  measurementId: "G-3SLWZ2YEMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
