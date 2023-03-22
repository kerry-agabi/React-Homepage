import React, {useState, useEffect } from 'react'
import  '../../App.css'
import data from '../../Data/data.json'
import Services from './Services';

function Products() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([])

  useEffect(() => 
    setJobs(data),
  []);
  console.log(jobs);
  const filterBytags = ({role, level, tools, languages}) => {

    if(filters.length == 0){
      return true;
    }

    const tags = [role, level];

    if(tools){
  
      tags.push(...tools)
    }
  
    if(languages) {
      tags.push(...languages);
    }

    
    return tags.some(tag=> filters.includes(tag))
  
  }

  }

  
 const filteredjobs = jobs.filter(filterBytags) ;

  return (

  <div className='App'>

    <header className='bg-blue-300 mb-12'>
      <img src='/images/bg-header-desktop.svg'
      alt='bg-image' />
    </header>
    {jobs.length === 0 ? (<p> Jobs are fetching...</p>):(jobs.map((job)=> <Services job={job} key={job.id} /> ))}
 
  </div>
  
  
  )
}
export default Products
