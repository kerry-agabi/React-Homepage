import React, {useEffect} from 'react';
import Advertise from './Advertise';
import{ Card } from 'react-bootstrap'
import JobList from '../../Job';
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
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {jobs.map((job) => (
                <div key={job.id}>
                  <h1>{job.Company}</h1>
                  <h2>{job.JobTitle}</h2>
                  {/* display other job fields here */}
                </div>
              ))}
            </Card.Title>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default JobCard;