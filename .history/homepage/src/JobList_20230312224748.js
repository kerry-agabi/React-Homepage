import React, {useState} from 'react'
// import useFetchJobs from './useFetchJobs'
import{Container} from 'react-bootstrap'
import Advertise from './components/pages/Advertise'


 function JobList() {
const[params, setParams] = useState({})
const[page, setPage] = useState(1)
// const{jobs, loading, error} = useFetchJobs(params, page)
 
 
    return (
  <Container>
    {/* {loading && <h1>Loading</h1>}
    {error && <h1>Error. Try Refreshing the page</h1>} */}
    {jobs.map(jobs =>{
        return<JobCard key={jobs.id} job={job}/>
    })}
  </Container>
  )
}



export default JobList;