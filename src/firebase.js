// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firestore";

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
export {auth}
export default firebase;
//export the fire store
export const firestore = firebase.firestore;
//export the createuserDocument function
{/**
export const createUserDocument= async(user, {additionalData})=>{
//if there is no user coming from the firebase do nothing
if(!user) return;
//get the reference from the database
const userRef= firestore.doc('users/${user.uid}');
//fetch the document's address locations
const snapshot = await userRef.get();
 *
//if there is not a documents, create one 
if(!snapshot.exists){
  const {email} = user;
  const {username} = additionalData;
  const {phone} = additionalData;
}
//let's create the user
try{
  userRef.set({
username, 
email,
phone, 
createdAt: new Date()


  });
}catch (error){
  console.log('Error in creating user, error');
}

};







//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

*/}