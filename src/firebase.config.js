// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEM7vg5u1unQZPhfVe4rDQTypI8FqC2jo",
  authDomain: "seeknsave-91610.firebaseapp.com",
  projectId: "seeknsave-91610",
  storageBucket: "seeknsave-91610.appspot.com",
  messagingSenderId: "731555107516",
  appId: "1:731555107516:web:bbdd8bf289b7ce6ea4f6b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)