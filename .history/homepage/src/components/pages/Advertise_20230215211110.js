import React from 'react'
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function Advertise() {
    
    const firebaseConfig = {
        // your Firebase config here
      };
      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();
      
      function JobAdForm() {
        const [jobTitle, setJobTitle] = useState('');
        const [jobDescription, setJobDescription] = useState('');
        const [jobRequirements, setJobRequirements] = useState('');
        const [jobLocation, setJobLocation] = useState('');
      
        const handleSubmit = (event) => {
          event.preventDefault();
          // Save the form data to Firebase
          db.collection('jobAdvertisements').add({
            jobTitle,
            jobDescription,
            jobRequirements,
            jobLocation,
          })
          .then(() => {
            console.log('Job advertisement submitted successfully!');
          })
          .catch((error) => {
            console.error('Error submitting job advertisement:', error);
          });
        };
      
        return (
          <form onSubmit={handleSubmit}>
            <label>
              Job Title:
              <input type="text" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
            </label>
            <label>
              Job Description:
              <textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} />
            </label>
            <label>
              Job Requirements:
              <textarea value={jobRequirements} onChange={(event) => setJobRequirements(event.target.value)} />
            </label>
            <label>
              Job Location:
              <input type="text" value={jobLocation} onChange={(event) => setJobLocation(event.target.value)} />
            </label>
            <button type="submit">Submit</button>
          </form>
        );
      }
    }
