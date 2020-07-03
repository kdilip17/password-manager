import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDOfsGUrRQIfn4bxFMJZ41N6u-iNcjCwO0",
    authDomain: "manager-e255a.firebaseapp.com",
    databaseURL: "https://manager-e255a.firebaseio.com",
    projectId: "manager-e255a",
    storageBucket: "manager-e255a.appspot.com",
    messagingSenderId: "584952923983",
    appId: "1:584952923983:web:b42cc46af62c8979a6673a"
  };

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };