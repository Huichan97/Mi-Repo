import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyApFEA3lmfVIDCYSM5NcLgsePy7zLq5HZQ",
    authDomain: "test-1eb45.firebaseapp.com",
    projectId: "test-1eb45",
    storageBucket: "test-1eb45.appspot.com",
    messagingSenderId: "31171968570",
    appId: "1:31171968570:web:fa97f3f8355096ad2a7f03",
    measurementId: "G-40NX5RNHMD"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // Asegúrate de exportar auth




