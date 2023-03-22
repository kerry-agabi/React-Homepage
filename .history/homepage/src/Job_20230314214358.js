import React, {useState} from 'react'
import useFetchJobs from './useFetchJobs'
import{Container} from 'react-bootstrap'
import Advertise from './components/pages/Advertise'
import JobCard from './components/pages/JobCard'
import JobsPage from './components/pages/JobsPage'


 function Job() {
const[params, setParams] = useState({})
const[page, setPage] = useState(0)
const{jobs, loading, error} = useFetchJobs(params, page)
 
if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
    return (
      <Container>
        <br>
        </br>
        <JobsPage/>
     
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
    

      </Container>
    );
}



export default Job;