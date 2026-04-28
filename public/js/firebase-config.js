import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXEfqZ_XR5vdKMWhrL_Jgl9I0pm0OOcT4",
  authDomain: "campusbite-b0225.firebaseapp.com",
  projectId: "campusbite-b0225",
  storageBucket: "campusbite-b0225.firebasestorage.app",
  messagingSenderId: "23993036703",
  appId: "1:23993036703:web:66f5372560f035b9f297aa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);