import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALlJ882L0sNowP2greCSGYPlj32KjhL1A",
  authDomain: "my-anime-list-231303.firebaseapp.com",
  projectId: "my-anime-list-231303",
  storageBucket: "my-anime-list-231303.firebasestorage.app",
  messagingSenderId: "884722704163",
  appId: "1:884722704163:web:2ef53a4630d7f602c17696",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
