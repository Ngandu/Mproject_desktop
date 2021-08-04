import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Screens from "./navigation/screens";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCz4HDP1ZbQLFicM7_9szsQaRlC8slXsRA",
  authDomain: "mproject-802df.firebaseapp.com",
  databaseURL: "https://mproject-802df.firebaseio.com",
  projectId: "mproject-802df",
  storageBucket: "mproject-802df.appspot.com",
  messagingSenderId: "151086041155",
  appId: "1:151086041155:web:e70b273e1613452eb5ecf6",
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <Screens />
    </>
  );
}

export default App;
