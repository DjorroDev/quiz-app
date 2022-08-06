// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDymTqaC5SZal1iv1iiMGLAgHiUG7EQMdY',
  authDomain: 'nuxt-crud-6c866.firebaseapp.com',
  projectId: 'nuxt-crud-6c866',
  storageBucket: 'nuxt-crud-6c866.appspot.com',
  messagingSenderId: '757719598077',
  appId: '1:757719598077:web:871de23e6433b17b904f94'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =  getFirestore(app);

export {
    db
}