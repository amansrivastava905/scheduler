import  firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

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

  
 
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    // console.log(userAuth)
    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    };

    return userRef
  }


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database()
  export default database;



  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  // export const userRef = firestore.doc(`users/${userAuth.uid}`);


  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  // export const currentUser
