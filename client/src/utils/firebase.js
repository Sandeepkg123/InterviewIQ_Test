
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-dc341.firebaseapp.com",
  projectId: "interviewiq-dc341",
  storageBucket: "interviewiq-dc341.firebasestorage.app",
  messagingSenderId: "692065645930",
  appId: "1:692065645930:web:4f1aaacadfe2df91e7a113"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getauth(app);
const provider = new GoogleAuthProvider();
export { auth, provider }