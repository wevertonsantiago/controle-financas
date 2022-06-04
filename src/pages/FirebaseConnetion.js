import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyAyz5h93ZsL7rGwEBHYu5Mi82EYtVFrTBw",
    authDomain: "financasapp-afed8.firebaseapp.com",
    projectId: "financasapp-afed8",
    storageBucket: "financasapp-afed8.appspot.com",
    messagingSenderId: "620733014666",
    appId: "1:620733014666:web:b90bb66dd3d0fefead0373"
  };
  
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;