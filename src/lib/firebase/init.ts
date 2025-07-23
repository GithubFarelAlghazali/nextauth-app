// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyCKphaar6azK8YOacYyW8A9NMk6WGRZdAE",
     authDomain: "nextjs-app-1edcf.firebaseapp.com",
     projectId: "nextjs-app-1edcf",
     storageBucket: "nextjs-app-1edcf.firebasestorage.app",
     messagingSenderId: "841865264254",
     appId: "1:841865264254:web:cc1cea9a19a5099c4aac2f",
     measurementId: "G-7TSK4HFKLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export default app;
