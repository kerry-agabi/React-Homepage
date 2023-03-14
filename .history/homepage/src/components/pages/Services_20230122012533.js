import React from 'react'
import{Grid, Box,  Button, Select, MenuItem } from '@mui/material'
//import  '../../App.css'

export default function Services() {
  return (

<Grid container justify="right">
  <Grid item xs={10}>
 <Box>
  <Select defaultvalue= "Full time">
    <MenuItem value = 'Full time'>Full time</MenuItem>
    <MenuItem value = 'Part time'>Part time</MenuItem>
    <MenuItem value = 'Contracted'>Contracted time</MenuItem>

  </Select>
 </Box>


  </Grid>
</Grid>

  )
}
