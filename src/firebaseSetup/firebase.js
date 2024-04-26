import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN92ukxV8OErTstq6TW9sA_7O_sIM-RSU",
  authDomain: "searchandrescue-fbb70.firebaseapp.com",
  projectId: "searchandrescue-fbb70",
  storageBucket: "searchandrescue-fbb70.appspot.com",
  messagingSenderId: "716237976802",
  appId: "1:716237976802:web:262406240c6165a3545abb",
  measurementId: "G-J563W26712"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Import 'auth' using 'getAuth'
const db = getFirestore(app);

export { app, db, auth };

