import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBql-1L7PocGnIcpDm1KZ2y6Q9BheIWwpw",
  authDomain: "drlabeeb-2a302.firebaseapp.com",
  projectId: "drlabeeb-2a302",
  storageBucket: "drlabeeb-2a302.firebasestorage.app",
  messagingSenderId: "1005947887771",
  appId: "1:1005947887771:web:c92e4473d504e4c19b663e",
  measurementId: "G-HW0P6Q9F6Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
