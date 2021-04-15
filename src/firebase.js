import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZ9K7_Nw516byNglfQKqJQ-6mhRtz4CFo",
    authDomain: "photosearch-dev.firebaseapp.com",
    projectId: "photosearch-dev",
    storageBucket: "photosearch-dev.appspot.com",
    messagingSenderId: "264193435342",
    appId: "1:264193435342:web:1a11c3801929eff771129f",
    measurementId: "G-3M1NMFJ8LR",
};

const app = firebase.initializeApp(firebaseConfig);

export const projectFirestore = firebase.firestore();

export const auth = app.auth();
export default app;
