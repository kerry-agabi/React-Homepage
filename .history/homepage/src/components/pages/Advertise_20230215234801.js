import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import  { doc, onSnapshot, collection, query, where } from  'firebase/compat/firestore';
import '../../File.css'
import db from '../../firebase'

    
    // const firebaseConfig = {
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY, 
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAiN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, 
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, 
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, 
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, 
    // appId: process.env.REACT_APP_FIREBASE_APP_ID, 

    
    //   };
    //   firebase.initializeApp(firebaseConfig);
    //   const db = firebase.firestore();
      
    //   function Advertise() {
    //     const [jobTitle, setJobTitle] = useState('');
    //     const [jobDescription, setJobDescription] = useState('');
    //     const [jobRequirements, setJobRequirements] = useState('');
    //     const [jobLocation, setJobLocation] = useState('');
      
    //     const handleSubmit = (event) => {
    //       event.preventDefault();
    //       // Save the form data to Firebase
    //       db.collection('jobAdvertisements').add({
    //         jobTitle,
    //         jobDescription,
    //         jobRequirements,
    //         jobLocation,
    //       })
    //       .then(() => {
    //         console.log('Job advertisement submitted successfully!');
    //       })
    //       .catch((error) => {
    //         console.error('Error submitting job advertisement:', error);
    //       });
    //     };

    const Advertise = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [message, setMessage] = useState("");
    
      const [loader, setLoader] = useState(false);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
    
        q = query(collection(db, "contacts"))
          .add({
            name: name,
            email: email,
            message: message,
          })
          .then(() => {
            setLoader(false);
            alert("Your message has been submitted👍");
          })
          .catch((error) => {
            alert(error.message);
            setLoader(false);
          });
    
        setName("");
        setEmail("");
        setMessage("");
      };
      
        return (
          <form className="form" onSubmit={handleSubmit}>
      <h1>Contact Us 🤳</h1>

      <label>Name</label>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email</label>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Message</label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
      >
        Submit
      </button>
    </form>
        );
      }

    export default Advertise;