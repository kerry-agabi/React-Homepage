import React, {useEffect, useState} from 'react';
import Advertise from './Advertise';
import{ Card } from 'react-bootstrap'
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';



function JobCard() {
const [jobs, setJobs] = useState([])

useEffect(() => {

  getJobs()
}, [])

useEffect(() => {
  console.log(jobs)
}, [jobs])



function getJobs(){
 
  const jobCollectionRef = collection(db, 'jobs')
  getDocs(jobCollectionRef).then(response => {
    console.log(response.docs);
    const job = response.docs.map(doc =>({data: doc.data(), id:doc.id, }) )
    setJobs(job)
  })
  .catch(error => console.log(error.message))
}



  return (
    
    <div className='App'>
      
        <div>
        {jobs.map((job) => {
          return(
            <div key = {job.id}>
              <h1> Job: {job.JobDescription}</h1>
              {job.Company}
              </div>
          )
        })}
     
      </div>
      
       
      
</div>
     
    
  );
}

export default JobCard;