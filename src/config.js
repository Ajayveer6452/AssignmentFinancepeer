//Firebase database config copied from firebase console
import Firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCj8EkOEZs8oLx_Zwf8Or__zktQsmxb-nc",
    authDomain: "assigmnetfinancepeer.firebaseapp.com",
    databaseURL: "https://assigmnetfinancepeer.firebaseio.com",
    projectId: "assigmnetfinancepeer",
    storageBucket: "assigmnetfinancepeer.appspot.com",
    messagingSenderId: "467274313688",
    appId: "1:467274313688:web:ffdcd023b0a499ea"
  };

let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();