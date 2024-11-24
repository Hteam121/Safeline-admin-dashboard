// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAgPaLx5dVKUCEDCfjJlWYRa1uc53ljBys",
    authDomain: "safeline-8e5ee.firebaseapp.com",
    databaseURL: "https://safeline-8e5ee-default-rtdb.firebaseio.com",
    projectId: "safeline-8e5ee",
    storageBucket: "safeline-8e5ee.firebasestorage.app",
    messagingSenderId: "876446768457",
    appId: "1:876446768457:web:c19b32511f2e416ac7ce98",
    measurementId: "G-E8PF06KCQP"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
