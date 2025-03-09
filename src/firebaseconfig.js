// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxFWBQcI-H1ge-6QAM413MBRh93hf537s",
  authDomain: "argasaapp.firebaseapp.com",
  projectId: "argasaapp",
  storageBucket: "argasaapp.firebasestorage.app",
  messagingSenderId: "72902916989",
  appId: "1:72902916989:web:e3e159f5e35af6d5e22a14",
  measurementId: "G-XTWMBGR8PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth=getAuth(app);

export {auth};  