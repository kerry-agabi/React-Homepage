import React, {useState, useEffect } from 'react'
import  '../../App.css'
import data from '../../Data/data.json'
import Services from './Services';

function Products() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(['CSS'])

  useEffect(() => 
    setJobs(data),
  []);
  console.log(jobs);
  const filterFunc = ({role, level, tools, languages}) => {

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

  

  const handleTagClick = (tag) => {

    setFilters([...filters, tag])
  }
 const filteredjobs = jobs.filter(filterFunc) ;

  return (

  <div className='App'>

    <header className='bg-blue-300 mb-12'>
      <img src='/images/bg-header-desktop.svg'
      alt='bg-image' />
    </header>

    <div className={`flex bg-white shadow-md my-16 mx-10 p-8 rounded`}>
      </div>

    <div className='bg-white shadow-md'>
      {
          filters.length > 0 && filters.map((filter) => <span>{filter}</span>)

      }

    </div>
    {jobs.length === 0 ? (<p> Jobs are fetching...</p>):(filteredjobs.map((job)=> <Services job={job} key={job.id} handleTagClick={handleTagClick}/> ))}
 
  </div>
  
  
  )
}
export default Products
