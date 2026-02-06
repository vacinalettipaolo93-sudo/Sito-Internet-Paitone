
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Credenziali aggiornate per il progetto sito-paitone-arena
const firebaseConfig = {
  apiKey: "AIzaSyCluLq91dQW0uD8KjxQm72Z28BGqeBOw3Y",
  authDomain: "sito-paitone-arena.firebaseapp.com",
  projectId: "sito-paitone-arena",
  storageBucket: "sito-paitone-arena.firebasestorage.app",
  messagingSenderId: "247168303986",
  appId: "1:247168303986:web:71930292198af53f1613eb",
  measurementId: "G-LL3S3TJN6B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
