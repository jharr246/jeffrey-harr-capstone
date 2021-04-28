import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC8_myiQ39M7kA-phWR8zim3TyY-xJ5ywM",
  authDomain: "dogspace-f217f.firebaseapp.com",
  projectId: "dogspace-f217f",
  storageBucket: "dogspace-f217f.appspot.com",
  messagingSenderId: "513139464629",
  appId: "1:513139464629:web:7a9fd4e197c4a1b21561fc",
  measurementId: "G-4S1CHZQPQ4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
