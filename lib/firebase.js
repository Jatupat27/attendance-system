import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBsnKakHDP59bzeNlRaAq4nV6FoJz5whlA",
    authDomain: "attendance-qr-26c8c.firebaseapp.com",
    projectId: "attendance-qr-26c8c",
    storageBucket: "attendance-qr-26c8c.firebasestorage.app",
    messagingSenderId: "690590304626",
    appId: "1:690590304626:web:20955c1158055cc08af5eb"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);