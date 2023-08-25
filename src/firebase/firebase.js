import { getFirestore, collection } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDilMZUUobJuZkOzUYJr5WdRNAW5lUJrDs",
  authDomain: "flixoverse.firebaseapp.com",
  projectId: "flixoverse",
  storageBucket: "flixoverse.appspot.com",
  messagingSenderId: "95068847836",
  appId: "1:95068847836:web:a211dad476f81e81ab3e19"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

// Disable reCAPTCHA verification for testing purposes.
//firebase.auth.settings.appVerificationDisabledForTesting = true;



export default app;