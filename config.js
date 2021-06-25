import firebase from 'firebase/app';
import 'firebase/auth';

 

const firebaseConfig = {
  apiKey: "AIzaSyBUjV22hhb_ZF-VsGqFoopbbsbf5hodfyQ",
  authDomain: "spicyfy-7bd43.firebaseapp.com",
  databaseURL: "https://spicyfy-7bd43-default-rtdb.firebaseio.com",
  projectId: "spicyfy-7bd43",
  storageBucket: "spicyfy-7bd43.appspot.com",
  messagingSenderId: "694172339161",
  appId: "1:694172339161:web:a61883d13ddee37dc8e7c8",
  measurementId: "G-8S159TRVQ3"
};

 

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}