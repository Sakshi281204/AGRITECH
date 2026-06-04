import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDL2Ot7jQlAvNi6fDpLJXEU3MsJ2oPiOXM",
  authDomain: "agritech-c727d.firebaseapp.com",
  projectId: "agritech-c727d",
  storageBucket: "agritech-c727d.firebasestorage.app",
  messagingSenderId: "538430530307",
  appId: "1:538430530307:web:d594d9b42199c3f73d3f36",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;