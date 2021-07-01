// import withAuth from '../auth/withAuth';
// import { useUser } from '../auth/useUser';
// import firebase from '../firebase'
// import React from 'react';

// function App() {
// const [spells, setSpells] = React.useState([])

// React.useEffect(() => {
// const fetchData = async () => {
// const db = firebase.firestore()
// const data = await db.collection("spells").get()
// setSpells(data.docs.map(doc => doc.data()))
// }
// fetchData()
// }, [])

// return (
// <ul>
// {spells.map(spell => (
// <li key ={spell.name}>{spell.name}</li>
// ))}
// </ul>
// )
// }
// export default App;

// import firebase from 'firebase';

// const config = {
// apiKey: "AIzaSyBUjV22hhb_ZF-VsGqFoopbbsbf5hodfyQ",
// authDomain: "spicyfy-7bd43.firebaseapp.com",
// databaseURL: "https://spicyfy-7bd43-default-rtdb.firebaseio.com",
// projectId: "spicyfy-7bd43",
// storageBucket: "spicyfy-7bd43.appspot.com",
// messagingSenderId: "694172339161",
// appId: "1:694172339161:web:a61883d13ddee37dc8e7c8",
// measurementId: "G-8S159TRVQ3"
// };
// // Initialize Firebase
// firebase.initializeApp(config);
