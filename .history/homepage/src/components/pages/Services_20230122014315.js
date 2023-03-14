import React from 'react'
import{Grid, Box,  Button, Select, MenuItem } from '@mui/material'
import{makeStyles} from "@material-ui/core"
//import  '../../App.css'
const useStyles = makeStyles({
   
    wrapper: { 
      border:'1px solid red'
    }




})
export default function Services() {
  const classes = useStyles();
  return (


 <Box className={classes.wrapper}>
  <Select disableUnderline variant='filled' value ='Full time'>
    <MenuItem value = 'Full time'>Full time</MenuItem>
    <MenuItem value = 'Part time'>Part time</MenuItem>
    <MenuItem value = 'Contracted'>Contracted</MenuItem>
    

    </Select>

    <Select disableUnderline variant='filled' value ='In-office'>
    <MenuItem value = 'Remote'>Full time</MenuItem>
    <MenuItem value = 'In-office'>Part time</MenuItem> 
    </Select>

    <Button type="submit">Search</Button>

 </Box>

 




  )
}
