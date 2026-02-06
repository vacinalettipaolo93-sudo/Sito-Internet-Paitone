
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Configurazione Firebase dinamica.
 * Legge i valori dalle variabili d'ambiente (process.env) configurate su Vercel.
 * Se non presenti, utilizza i valori di default forniti per il progetto sito-paitone-arena.
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCluLq91dQW0uD8KjxQm72Z28BGqeBOw3Y",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "sito-paitone-arena.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "sito-paitone-arena",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "sito-paitone-arena.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "247168303986",
  appId: process.env.FIREBASE_APP_ID || "1:247168303986:web:71930292198af53f1613eb",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-LL3S3TJN6B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
