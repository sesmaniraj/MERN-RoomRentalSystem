// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernroom.firebaseapp.com",
  projectId: "mernroom",
  storageBucket: "mernroom.appspot.com",
  messagingSenderId: "163484203278",
  appId: "1:163484203278:web:0bc36b2b9ec2e0e16bbf5f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
