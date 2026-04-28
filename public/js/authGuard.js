import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXEfqZ_XR5vdKMWhrL_Jgl9I0pm0OOcT4",
  authDomain: "campusbite-b0225.firebaseapp.com",
  projectId: "campusbite-b0225",
  storageBucket: "campusbite-b0225.firebasestorage.app",
  messagingSenderId: "23993036703",
  appId: "1:23993036703:web:66f5372560f035b9f297aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Ye function check karega — user logged in hai ya nahi
// role = 'customer' ya 'staff'
export async function requireAuth(role) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Login nahi hai — wapas bhejo
        window.location.href = '/user-selection';
        return;
      }

      if (role) {
        // Role check karo
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists() || userDoc.data().role !== role) {
          window.location.href = '/user-selection';
          return;
        }
      }

      resolve(user);
    });
  });
}