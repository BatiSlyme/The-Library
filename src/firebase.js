// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1J51T_n0dGdJ8s6JCb4sA8Ea-wLw3nVk",
  authDomain: "thelibrary-847af.firebaseapp.com",
  projectId: "thelibrary-847af",
  storageBucket: "thelibrary-847af.appspot.com",
  messagingSenderId: "286882986991",
  appId: "1:286882986991:web:7be2f672c2697d8474d41a",
  measurementId: "G-PTZKCSNL48"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const analytics = getAnalytics(app);