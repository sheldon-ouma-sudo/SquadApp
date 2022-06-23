// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFhvAU2I5a4faFFzWeyZHUIZLULjZkrfA",
  authDomain: "squad-db9d1.firebaseapp.com",
  projectId: "squad-db9d1",
  storageBucket: "squad-db9d1.appspot.com",
  messagingSenderId: "32488750865",
  appId: "1:32488750865:web:86cdac73ef9962c91c56b0",
  measurementId: "G-GJB3TNH1F9"
};

// Initialize Firebase
let app;
if(firebase.apps.length == 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app
}
const auth = firebase.auth()
export {auth};
//const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);