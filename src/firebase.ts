import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  // apiKey: "AIzaSyD-8cCLqRZbK0epCxJ-fSRkKa-FCR0-T0M",
  // authDomain: "pantry-tracker-b8493.firebaseapp.com",
  // projectId: "pantry-tracker-b8493",
  // storageBucket: "pantry-tracker-b8493.appspot.com",
  // messagingSenderId: "1035733572722",
  // appId: "1:1035733572722:web:954bd16df4d17a4804b6eb",
  // measurementId: "G-FL72PM4Q72",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
