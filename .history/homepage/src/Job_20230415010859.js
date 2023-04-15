import React, {useState} from 'react'
import useFetchJobs from './useFetchJobs'
import{Container} from 'react-bootstrap'
import JobCard from './components/pages/JobCard'


 function Job() {
const[params, setParams] = useState({})
const[page, setPage] = useState(1)
const{jobs, loading, error} = useFetchJobs(params, page)
  
 
 
    return (
      <Container>
        <br>
        </br>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Try Refreshing the page</h1>}
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}

      </Container>
    );  
}



export default Job;