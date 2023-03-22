import React, { useState, useEffect, Component } from 'react'
import '../../App.css'
import{Grid, Box,  Button, Select, MenuItem, Toolbar, makeStyles, Typography } from '@mui/material'
import { MuiThemeProvider, ThemeProvider } from '@material-ui/core';
import theme from '../../theme/theme';
import { styled } from "@mui/system";
import { blue } from '@mui/material/colors';
import data from '../../Data/data.json'

const Services = ({
  
  
  
  
  job:{
      
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
    <div className={`flex flex-col bg-white shadow-md my-16 mx-10 p-3 rounded ${featured && 'border-l-8 border-black border-solid'} sm:flex-row`}>
      <div>
        <img className='-mt-16 mb-4 w-20 h-20 sm:mt-0' src={logo} alt={company} />{" "}
      </div>

      <div className="flex flex-col justify-between ml-4 ">
        <h3 className="font-bold text-base text-blue-500 mb-4">
          {company}
          {isNew && <span className='text-blue-100 bg-blue-500 font-bold m-2 py-1 px-2 rounded-full uppercase'>New</span>}
          {featured && <span className='text-white bg-gray-800 font-bold m-2 py-1 px-2 rounded-full uppercase'>Featured</span>}
        </h3>
        <h2 className="font-bold text-xl mr-20 my-2 mb-4"> {position}</h2>
        <p className="text-gray-700">
          {" "}
          {postedAt} · {contract} · {location}{" "}
        </p>
      </div>

      <div className="flex flex-wrap items-center mt-4 mx-4 pt-4 border-gray-200 border-solid sm:ml-auto sm:border-0 sm:pt-0 sm:mt-0">
        {tags
          ? tags.map((tag) => (
              <span className="text-blue-100 bg-blue-400 font-bold mr-4 mb-4 p-2 rounded">
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


