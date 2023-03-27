import React, { useState, useEffect} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db, storage} from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

   

   
   function Advertise() {
      const [newCompany, setNewCompany] = useState("")
      const [newContract, setNewContract] = useState("")
      const [newJobDescription, setNewJobDescription] = useState("")
      const [newJobTitle, setNewJobTitle] = useState("")
      const [newLocation, setNewLocation] = useState("")
      const [newSkills, setNewSkills] = useState("")
      const [newdate, setNewdate] = useState("")
      const [newLink, setNewLink] = useState("")
      const [imageFile, setImageFile] = useState(null);
      const [ImageURL, setImageURL] = useState('');

      const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
      
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // track upload progress here if needed
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageFile(downloadURL);
            setImageURL(downloadURL); // add this line to set the ImageURL to the downloadURL
          }
        );
      };


      const[jobs, setjobs] = useState([])
      const jobsCollectionRef = collection(db, "jobs")

      const createJob = async () => {


        await addDoc(jobsCollectionRef, {
          Company: newCompany,
          Contract: newContract,
          JobDescription: newJobDescription,
          JobTitle: newJobTitle,
          Location: newLocation,
          Skills: newSkills,
          date: newdate,
          Link: newLink,
          ImageUrl: ImageURL,

        });

      }

        
      return (
      <form className="form">
      <h1>Advertise with us 🤳</h1>

      <label>Company Name</label>
      <input
        placeholder="Company Name"
        type='text'
        onChange={(event) => {setNewCompany(event.target.value)}}
      />
       <label htmlFor="image-upload">Upload an Image:</label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      <label>Contract</label>
      <input
        placeholder="Contract"
        type='text'
        onChange={(event) => {setNewContract(event.target.value)}}
      />

      <label>Job description</label>
      <textarea
        placeholder="Job Description"
        type='text'
        onChange={(event) => {setNewJobDescription(event.target.value)}}
      ></textarea>

      <label>Enter a date:</label>
      <input
        type="date"
        id="my-date-input"
        placeholder="YYYY-MM-DD"
        onChange={(event) => {setNewdate(event.target.value)}}
      />

      
<label>Job title</label>
      <input
        placeholder="Job title"
        type='text'
        onChange={(event) => {setNewJobTitle(event.target.value)}}
      />

<label>Location</label>
      <input
        placeholder="Location"
        type='text'
        onChange={(event) => {setNewLocation(event.target.value)}}
      />

<label>Skills</label>
      <input
        placeholder="Skills"
        type='text'
        onChange={(event) => {setNewSkills(event.target.value)}}
      />

<label>Enter an Application link:</label>
      <input
        type="text"
        id="my-link-input"
        placeholder="http://example.com"
        onChange={(event) => setNewLink(event.target.value)}
      />

      <button onClick = {createJob}
        style={{ "#ccc" : " rgb(2, 2, 110)" }}>
        Advertise
      </button>
    </form>
     )
   }
   
    export default Advertise;