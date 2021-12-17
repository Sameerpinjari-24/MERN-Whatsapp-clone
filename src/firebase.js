// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOxFIuwbga7cPAfPBXlmoVrjaNltB8WqU",
  authDomain: "whatsapp-mern-clone-be3e5.firebaseapp.com",
  projectId: "whatsapp-mern-clone-be3e5",
  storageBucket: "whatsapp-mern-clone-be3e5.appspot.com",
  messagingSenderId: "560812148923",
  appId: "1:560812148923:web:37552c78ab184fe187019e",
  measurementId: "G-4DCYJGKPP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);