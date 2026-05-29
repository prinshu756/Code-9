// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMbSJLNywkrgqoO8MUZbrnIRb9eCqp0Cc",
  authDomain: "code-9-24afd.firebaseapp.com",
  projectId: "code-9-24afd",
  storageBucket: "code-9-24afd.firebasestorage.app",
  messagingSenderId: "78075411597",
  appId: "1:78075411597:web:87c18c0ed35370e70db6c4",
  measurementId: "G-V5YL7D7MSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);