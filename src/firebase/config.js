// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCe4Jz2iMqSZQwC7kgwWJQTUUxALqWw98",
    authDomain: "pedrotech-e94aa.firebaseapp.com",
    projectId: "pedrotech-e94aa",
    storageBucket: "pedrotech-e94aa.appspot.com",
    messagingSenderId: "608331829600",
    appId: "1:608331829600:web:df505d3f5bc5d25457ce05",
    measurementId: "G-VRVW19PNSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const dataStorage = getStorage(app);

export { auth, googleProvider, db, dataStorage }