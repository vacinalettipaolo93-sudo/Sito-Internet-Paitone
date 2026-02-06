
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Configurazione Firebase dinamica.
 * Legge i valori dalle variabili d'ambiente (window.process.env) se presenti,
 * altrimenti utilizza i valori di default forniti per il progetto sito-paitone-arena.
 */
const firebaseConfig = {
  apiKey: (window as any).process?.env?.FIREBASE_API_KEY || "AIzaSyCluLq91dQW0uD8KjxQm72Z28BGqeBOw3Y",
  authDomain: (window as any).process?.env?.FIREBASE_AUTH_DOMAIN || "sito-paitone-arena.firebaseapp.com",
  projectId: (window as any).process?.env?.FIREBASE_PROJECT_ID || "sito-paitone-arena",
  storageBucket: (window as any).process?.env?.FIREBASE_STORAGE_BUCKET || "sito-paitone-arena.firebasestorage.app",
  messagingSenderId: (window as any).process?.env?.FIREBASE_MESSAGING_SENDER_ID || "247168303986",
  appId: (window as any).process?.env?.FIREBASE_APP_ID || "1:247168303986:web:71930292198af53f1613eb",
  measurementId: (window as any).process?.env?.FIREBASE_MEASUREMENT_ID || "G-LL3S3TJN6B"
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
