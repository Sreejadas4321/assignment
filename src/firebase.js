// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPOONsCRRxQQtV_zf9m0vRzRdEpQF85fo",
  authDomain: "project-a823f.firebaseapp.com",
  projectId: "project-a823f",
  storageBucket: "project-a823f.appspot.com",
  messagingSenderId: "964750936245",
  appId: "1:964750936245:web:d1262f7c9f6569560f56fc",
  measurementId: "G-4P9B53E12D"
};


const app = initializeApp(firebaseConfig);
const auth= getAuth();

const db = getFirestore(app);
export {app, auth, db};
