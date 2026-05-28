import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCMbSJLNywkrgqoO8MUZbrnIRb9eCqp0Cc",
  authDomain: "code-9-24afd.firebaseapp.com",
  projectId: "code-9-24afd",
  storageBucket: "code-9-24afd.firebasestorage.app",
  messagingSenderId: "78075411597",
  appId: "1:78075411597:web:87c18c0ed35370e70db6c4",
  measurementId: "G-V5YL7D7MSK",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export { app };

export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};