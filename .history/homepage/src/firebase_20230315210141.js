import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/database"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"


function StartFirebase(){


const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY, 
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAiN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, 
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, 
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, 
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, 
    appId: process.env.REACT_APP_FIREBASE_APP_ID, 



})
const application = app
return getDatabase(application)
}

export const auth = app.auth()
export const db = getFirestore(app)
export const rtdb = firebase.database().ref();

export default app;
// function writeUserData(userId, name, email, imageUrl){



//  const db2 =getDatabase();
//  const storage = firebase.storage();
//  const reference = ref (db, 'users/' + userId)

// set(reference, {

//     username: name,
//     email: email,
//     profile_picture : imageUrl
// })

// }

// writeUserData("KerryAgabi", "KA", "myemail@example.com", "myimageurl");
