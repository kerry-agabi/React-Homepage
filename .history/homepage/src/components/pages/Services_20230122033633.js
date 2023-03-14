import React from 'react'
import '../../App.css'
import{Grid, Box,  Button, Select, MenuItem, makeStyles } from '@mui/material'
//import  '../../App.css'
const useStyles = theme => ({
  root: {
     flexGrow: 1,
     backgroundColor: "#fff",
     display: "flex",
     boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
     borderRadius:"5px", "& > *":{

        flex: 1,
        height:"45px",
        margin: "8px",

     },
   },
});

export default function Services() {
  const classes = useStyles();
  return (


 <Box className={classes.root}>
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

