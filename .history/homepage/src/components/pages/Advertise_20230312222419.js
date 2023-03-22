import { useState, useEffect} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db} from '../../firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

   import React from 'react'
   
   function Advertise() {
      const [newCompany, setNewCompany] = useState("")
      const [newContract, setNewContract] = useState("")
      const [newJobDescription, setNewJobDescription] = useState("")
      const [newJobTitle, setNewJobTitle] = useState("")
      const [newLocation, setNewLocation] = useState("")
      const [newSkills, setNewSkills] = useState("")


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
        });

      }

        // const updateUser = async (id, age) => {
        //   const userDoc = doc(db, "jobs", id)

        //   const newFields = { age:age + 1}

        //   await updateDoc(userDoc, newFields)


         


        // }
        
        const deletejobs = async(id) => {

          const jobDoc = doc(db, "jobs", id)
          await deleteDoc(jobDoc)
        }
      useEffect(()=>{ 

        const getjobs = async () => {

          const data = await getDocs(jobsCollectionRef);
          setjobs(data.docs.map((doc) => ({...doc.data(), id: doc.id }))) 

        }

       
      }, [])
     return (
      <form className="form">
      <h1>Advertise with us 🤳</h1>

      <label>Company Name</label>
      <input
        placeholder="Company Name"
        type='text'
        onChange={(event) => {setNewCompany(event.target.value)}}
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

      <button onClick = {createJob}
        style={{ "#ccc" : " rgb(2, 2, 110)" }}>
      
        Advertise
      </button>
      {jobs.map((job) => {
          return(

            <div>
              {" "}

              <h1>Company: {job.Company}</h1>
              <h1>Contract: {job.Contract}</h1>
              <h1>Job description: {job.JobDescription}</h1>
              <h1>Job title: {job.JobTitle}</h1>
              <h1>Location: {job.Location}</h1>
              <h1>Skills: {job.Skills}</h1>


              {/* <button onClick={() =>{updateUser(user.id, user.age )} }> Increase Age </button> */}
              <button onClick={() => {deletejobs(job.id)}}>Delete User </button>

              </div>

          )
         })}

    </form>
     )
   }
   
    export default Advertise;