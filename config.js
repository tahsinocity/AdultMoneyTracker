import { FIREBASE_API_KEY, APP_ID, MESSAGING_SENDER_ID } from '@env';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "budgetme-a1c1f.firebaseapp.com",
  projectId: "budgetme-a1c1f",
  storageBucket: "budgetme-a1c1f.appspot.com",
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();