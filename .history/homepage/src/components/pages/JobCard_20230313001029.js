import React, {useEffect} from 'react';
import Advertise from './Advertise';
import{ Card } from 'react-bootstrap'
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';



function JobCard({jobs}) {

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, 'jobs'));
      const jobs = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      // do something with the jobs data, e.g. set state
    };
  
    fetchData();
  }, []);
  


  return (
    <div>
      List Jobs
    </div>
  );
}

export default JobCard;