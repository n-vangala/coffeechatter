import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD04OmG5GptW5JZp04DtQ03KkSIEDVl3sk",
  authDomain: "coffeechatter-28cad.firebaseapp.com",
  projectId: "coffeechatter-28cad",
  storageBucket: "coffeechatter-28cad.firebaseapp.com",
  messagingSenderId: "889041072998",
  appId: "1:889041072998:web:e72cdc07e99a6caab64ea7",
  measurementId: "G-3SLWZ2YEMK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
