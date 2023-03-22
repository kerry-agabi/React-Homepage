import { useState, useEffect} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db} from '../../firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';


function JobCard() {

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

   getjobs()
  }, [])
 return (
  <div>

  
 
  {jobs.map((job) => {
      return(

        <div>
          {" "}

          <p>Company: {job.Company}</p>
          <p>Contract: {job.Contract}</p>
          <p>Job description: {job.JobDescription}</p>
          <p>Job title: {job.JobTitle}</p>
          <h1>Location: {job.Location}</h1>
          <h1>Skills: {job.Skills}</h1>


          {/* <button onClick={() =>{updateUser(user.id, user.age )} }> Increase Age </button> */}
          <button onClick={() => {deletejobs(job.id)}}>Delete User </button>

          </div>
          

      )
     })}


</div> )



}

export default JobCard;