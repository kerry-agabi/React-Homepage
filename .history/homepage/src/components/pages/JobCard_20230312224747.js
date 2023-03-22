import React from 'react';
import Advertise from './Advertise';
import{ Card } from 'react-bootstrap'
import JobList from '../../JobList';

function JobCard({job}) {


  return (
    <Card>
      <Card.Body> 

        <div className = "d-flex justify-content-between">
        <div>
          
        <Card.Title>
        {job.JobTitle} - <span className='text-muted font-weight-light'>{job.Company} </span>
        </Card.Title>

        </div>
        </div>
  

  </Card.Body>
    </Card>
  );
}

export default JobCard;