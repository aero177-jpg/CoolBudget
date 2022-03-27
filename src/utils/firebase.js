import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBwqav_GaTs7PqMCSwB8SHKhhQuRlH7RU",
  authDomain: "cool-cash-7f7dc.firebaseapp.com",
  projectId: "cool-cash-7f7dc",
  storageBucket: "cool-cash-7f7dc.appspot.com",
  messagingSenderId: "23730346680",
  appId: "1:23730346680:web:b29af1d27677316ecaf24d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
