import React from 'react'
import useFetchJobs from './useFetchJobs'
import{Container} from 'react-bootstrap'

 function JobList() {

    const{jobs, loading, error} = useFetchJobs()
  return (
  <Container>
    {loading && <h1>Loadding</h1>}
    {error && <h1>Error. Try Refreshing the page</h1>}
    {<h1> {jobs.length} </h1>}
  </Container>
  )
}



export default JobList;