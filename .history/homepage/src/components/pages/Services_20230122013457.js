import React from 'react'
import{Grid, Box,  Button, Select, MenuItem } from '@mui/material'
//import  '../../App.css'

export default function Services() {
  return (


 <Box>
  <Select value ='Full time'>
    <MenuItem value = 'Full time'>Full time</MenuItem>
    <MenuItem value = 'Part time'>Part time</MenuItem>
    <MenuItem value = 'Contracted'>Contracted</MenuItem>
    

    </Select>

    <Select value ='In-office'>
    <MenuItem value = 'Remote'>Full time</MenuItem>
    <MenuItem value = 'In-office'>Part time</MenuItem> 
    </Select>
 </Box>




  )
}