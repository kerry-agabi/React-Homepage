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
    //avoid readding filter
    if(filters.includes(tag)) return;

    setFilters([...filters, tag])
  }

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter(f => f !== passedFilter))
  }
 const filteredjobs = jobs.filter(filterFunc) ;

  return (
    <div className="App">
      <header className="bg-blue-300 mb-12">
        <img src="/images/bg-header-desktop.svg" alt="bg-image" />
      </header>

      {filters.length > 0 && (
        <div className={`flex bg-white shadow-md my-16 mx-10 p-4 rounded`}>
          {filters.map((filter) => (
            <span className='cursor-pointer  m-3 p-1'
              onClick={() => handleFilterClick(filter)}>
                <span
              className="text-blue-100 bg-blue-400 font-bold m-0 p-2 rounded cursor-pointer">
            
              {filter}
              </span>
            <span className='text-blue-100 bg-blue-500 m-2 p-2 rounded cursor-pointer'> ✖ </span>
            </span>
          ))}
        </div>
      )}

      {jobs.length === 0 ? (
        <p> Jobs are fetching...</p>
      ) : (
        filteredjobs.map((job) => (
          <Services job={job} key={job.id} handleTagClick={handleTagClick} />
        ))
      )}
    </div>
  );
}
export default Products
