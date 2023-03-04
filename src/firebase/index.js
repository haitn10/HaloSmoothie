// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAskp98smXL3cDDAVfWMrr7DP2forU_-ew",
  authDomain: "halosmoothie-6a4b6.firebaseapp.com",
  projectId: "halosmoothie-6a4b6",
  storageBucket: "halosmoothie-6a4b6.appspot.com",
  messagingSenderId: "728783300696",
  appId: "1:728783300696:web:6f108506d5fe107510822d",
  measurementId: "G-R6DM98T57T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
