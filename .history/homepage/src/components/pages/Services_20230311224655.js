import React, { useState, useEffect, Component } from 'react'
import '../../App.css'
// import{Grid, Box,  Button, Select, MenuItem, Toolbar, makeStyles, Typography } from '@mui/material'
// import { MuiThemeProvider, ThemeProvider } from '@material-ui/core';
// import theme from '../../theme/theme';
// import { styled } from "@mui/system";
// import { blue } from '@mui/material/colors';
import data from '../../Data/data.json'
import JobCard from './JobCard';


const handleClick = () => {
  const jsx = <JobCard/>;
  window.prompt('', jsx);
};
const Services = ({
  
  
  
  
  job:{
      company,
      logo,
      isNew,
      featured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools

  },
    handleTagClick,
}) =>

{

  const tags = [role, level];

  if(tools){

    tags.push(...tools)
  }

  if(languages) {
    tags.push(...languages);
  }
  
  return (
    <div
      className={`flex bg-white shadow-lg m-4 p-3 rounded ${featured &&
        "border-l-8 border-black border-solid"}`}
    >
      <div>
        <img src={logo} alt={company} />{" "}
      </div>

      <div className="flex flex-col justify-between ml-4 ">
        <h3 className="font-bold text-base text-blue-500">
          {company}
          {isNew && (
            <span className="text-blue-100 bg-blue-500 font-bold m-2 py-1 px-2 rounded-full">
              New
            </span>
          )}
          {featured && (
            <span className="text-white bg-gray-800 font-bold m-2 py-1 px-2 rounded-full">
              Featured
            </span>
          )}
        </h3>
        <h2 className="font-bold text-xl"> {position}</h2>
        <p className="text-gray-700">
          {" "}
          {postedAt} · {contract} · {location}{" "}
          <button onClick={handleClick}>Apply for job</button>
        </p>
      </div>

      <div className="bg-flex item-center ml-auto">
        {tags
          ? tags.map((tag) => (
              <span
                onClick={() => handleTagClick(tag)}
                className="text-blue-100 bg-blue-400 font-bold m-3 p-2 cursor-pointer rounded"
              >
                {tag}
              </span>
            ))
          : ""}
      </div>
    </div>
  );};
export default Services



//   return (
// <> 
        
//     </>
//           // TODO
//           // 1. Study the design and JSON
//           // 2. Create the Job Board Component
//           // 3. Get the data from the JSON
//           // 4. Pass down the date to the JBC
//           // 5. Style it.
//           // 6. Filter it.
//           // 7. Filter the data
//           //
//   )
// }


