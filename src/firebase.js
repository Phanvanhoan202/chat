// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBdHrRMZCuBqlBngCCI5e0tNGtpzzyPfJA',
    authDomain: 'chat2-5f9ef.firebaseapp.com',
    projectId: 'chat2-5f9ef',
    storageBucket: 'chat2-5f9ef.appspot.com',
    messagingSenderId: '6014388634',
    appId: '1:6014388634:web:808926bcf1ce37401a9223',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
