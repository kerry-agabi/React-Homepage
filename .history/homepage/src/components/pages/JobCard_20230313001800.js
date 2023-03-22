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

function getJobs(){
 
  const jobCollectionRef = collection(db, 'jobs')
  getDocs(jobCollectionRef).then(response => {

      console.log(response)
  })
  .catch(error => console.log(error.message))
}



  return (
    <div>
      List Jobs
    </div>
  );
}

export default JobCard;