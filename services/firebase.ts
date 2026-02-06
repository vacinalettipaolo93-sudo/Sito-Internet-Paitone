
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Le variabili d'ambiente verranno lette da Vercel durante il deploy
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSy...",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "paitone-sport.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "paitone-sport",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "paitone-sport.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
