import React, {useState, useEffect } from 'react'
import  '../../App.css'
import data from '../../Data/data.json'
import Services from './Services';

function Products() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => 
    setJobs(data),
  []);
  console.log(jobs);

  return (
  
  
  
  <div className='App'>
    <h1 className='text-xl'> Hello World! </h1>
    {jobs.length === 0 ? (<p> Jobs are fetching...</p>):(jobs.map((job)=> <Services job={job} key={job.id} /> ))}
 
  </div>
  
  
  )
}
export default Products