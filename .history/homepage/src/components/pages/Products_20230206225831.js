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

    <header className='bg-teal-500 mb-12'>
      <img src='/images/bg-header-desktop.svg'
      alt='bg-image' />
    </header>
    {jobs.length === 0 ? (<p> Jobs are fetching...</p>):(jobs.map((job)=> <Services job={job} key={job.id} /> ))}
 
  </div>
  
  
  )
}
export default Products
