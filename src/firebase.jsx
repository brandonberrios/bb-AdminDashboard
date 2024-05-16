import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDeK7pw-xuaE6HZIGHSdLyfbkk3voIHdIY",
    authDomain: "inventory-app-55b18.firebaseapp.com",
    projectId: "inventory-app-55b18",
    storageBucket: "inventory-app-55b18.appspot.com",
    messagingSenderId: "983991521143",
    appId: "1:983991521143:web:22c5e5de331c86ba0c9b72"
  };

{/*const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_API_ID
  };*/}


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
