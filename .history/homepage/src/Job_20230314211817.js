import React, {useState} from 'react'
import useFetchJobs from './useFetchJobs'
import{Container} from 'react-bootstrap'
import Advertise from './components/pages/Advertise'
import JobCard from './components/pages/JobCard'
import JobsPage from './components/pages/JobsPage'


 function Job() {
const[params, setParams] = useState({})
const[page, setPage] = useState(2)
const{jobs, loading, error} = useFetchJobs(params, page)
 
 
    return (
      <Container>
        <br>
        </br>
        <JobsPage page={page} setPage={setPage} hasNextPage={true}/>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Try Refreshing the page</h1>}
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
     <JobsPage page={page} setPage={setPage} hasNextPage={true} />

      </Container>
    );
}



export default Job;