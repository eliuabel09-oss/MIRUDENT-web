import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAxjbxIzLehI7baasls1AQvmD3CP4bJw4w",
  authDomain: "villalta-dental.firebaseapp.com",
  projectId: "villalta-dental",
  storageBucket: "villalta-dental.firebasestorage.app",
  messagingSenderId: "640121608972",
  appId: "1:640121608972:web:d27289820925cc76108729",
};

const app      = initializeApp(firebaseConfig);
export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();