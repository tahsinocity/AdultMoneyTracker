import { FIREBASE_API_KEY, APP_ID, MESSAGING_SENDER_ID } from '@env'

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "adult-money-tracker.firebaseapp.com",
  projectId: "adult-money-tracker",
  storageBucket: "adult-money-tracker.appspot.com",
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};