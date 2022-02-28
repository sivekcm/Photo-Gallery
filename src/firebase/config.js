

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI-6rdDy8zYANKUP2EVjXQl6hlEouBfeE",
  authDomain: "photo-gallery-dbdde.firebaseapp.com",
  projectId: "photo-gallery-dbdde",
  storageBucket: "photo-gallery-dbdde.appspot.com",
  messagingSenderId: "420608240680",
  appId: "1:420608240680:web:852efea1fb19f5f818d91d",
  measurementId: "G-B3VL198LQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage();
const projectFirestore = getFirestore();
const timestamp = serverTimestamp();

export { projectStorage, projectFirestore, timestamp };