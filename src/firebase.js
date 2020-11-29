import  firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAGm6QMQhhnj0qTFPaFJYlYbzih6ocVzXA",
    authDomain: "reved-attendance.firebaseapp.com",
    databaseURL: "https://reved-attendance.firebaseio.com",
    projectId: "reved-attendance",
    storageBucket: "reved-attendance.appspot.com",
    messagingSenderId: "16408243193",
    appId: "1:16408243193:web:360ba903d22a2a0442ab28",
    measurementId: "G-D7Y25T6XJG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  export default database;