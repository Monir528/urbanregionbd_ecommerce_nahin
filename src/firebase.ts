// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyAF7qpqqZLWJ_WA9cCJ_kXKAeXnBEk7XcM",
    authDomain: "urbanregionbd.firebaseapp.com",
    projectId: "urbanregionbd",
    storageBucket: "urbanregionbd.firebasestorage.app",
    messagingSenderId: "366224928478",
    appId: "1:366224928478:web:dda1ae4608996603d35c4f",
    measurementId: "G-9L23FH79FK"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Conditionally initialize Analytics only on the client
if (typeof window !== "undefined") {
    // Check if analytics is supported in the current environment
    isSupported().then((supported) => {
        if (supported) {
            getAnalytics(app);
        }
    });
}

// Export the auth instance to be used in your app
export const auth = getAuth(app);
