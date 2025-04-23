// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClDxy2XYEgGjP4QhLUqmRkDjxc-k7WLFE",
  authDomain: "dormitorychat-be543.firebaseapp.com",
  databaseURL: "https://dormitorychat-be543-default-rtdb.firebaseio.com",
  projectId: "dormitorychat-be543",
  storageBucket: "dormitorychat-be543.firebasestorage.app",
  messagingSenderId: "740172932698",
  appId: "1:740172932698:web:f1f7aa4d5a71fff81b9a63",
  measurementId: "G-C1KFS4W8JE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };