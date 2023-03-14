import React from 'react'
import{Grid, Box,  Button, Select, MenuItem } from '@mui/material'
//import  '../../App.css'

export default function Services() {
  return (


 <Box>
 <Select
  name="form-dept-select"
  options={depts}
  defaultValue={{ label: "Select Dept", value: 0 }}
  onChange={e => {
              this.setState({
              department: e.label,
              deptId: e.value
              });
           }} />
    <MenuItem value = 'Full time'>Full time</MenuItem>
    <MenuItem value = 'Part time'>Part time</MenuItem>
    <MenuItem value = 'Contracted'>Contracted</MenuItem>
    

    
 </Box>




  )
}
