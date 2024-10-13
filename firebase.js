
// Import the functions you need from the SDKs you need
// lib/firebase.js (or utils/firebase.js)

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import { trace } from "firebase/performance";
//import { performance } from './firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc2fl3Ab8eu_DTEO-Ro8B9vXB2hX6Q97w",
  authDomain: "movemate-d955c.firebaseapp.com",
  projectId: "movemate-d955c",
  storageBucket: "movemate-d955c.appspot.com",
  messagingSenderId: "629905031546",
  appId: "1:629905031546:web:f4879d7b95336d6b9e16c3",
  measurementId: "G-X21Y5QP1R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, provider, auth, db };

