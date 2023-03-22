import React, { useState, useEffect, Component } from 'react'
import '../../App.css'
import{Grid, Box,  Button, Select, MenuItem, Toolbar, makeStyles, Typography } from '@mui/material'
import { MuiThemeProvider, ThemeProvider } from '@material-ui/core';
import theme from '../../theme/theme';
import { styled } from "@mui/system";
import { blue } from '@mui/material/colors';
import data from '../../Data/data.json'

const skills = ["Javascript", "React.js", "Node.js" ];
export default function Services() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(data);
  }, []);
  console.log(jobs);

  return (
<> 
        <Box mb={3} sx={{
          bgcolor: '#fff',
          display: "flex",
          boxShadow: "0px 1px 5px rgba(0,0,0.1)",
          float: 'centre',
          borderRadius: "5px",
          "& > *": {
            flex: "1",
            height: "45px",
            margin: "5px" 
          },
          marginTop: '70px'
        }} > 
    <Select disableUnderline variant='filled' value ='In-office'>
     <MenuItem value = 'Remote'>Remote</MenuItem>
     <MenuItem value = 'In-office'>In-office</MenuItem> 
     </Select>


     <Select disableUnderline variant='filled' value ='Full time'>
    <MenuItem value = 'Full time'>Full time</MenuItem>
    <MenuItem value = 'Part time'>Part time</MenuItem>
    <MenuItem value = 'Contracted'>Contracted</MenuItem>
    </Select>
      <Button variant = "contained" type="submit">Search</Button>
      </Box>

      <Box p={4} sx={{

                border: '1px solid #e8e8e8'


      }}>
            <Grid container alignItems={"center"}>
                <Grid item xs>
                  <Typography variant="subtitle1"> Frontend Developer </Typography>                  
                  <Typography variant="subtitle2" style={{fontFamily: "Poppins, sans-serif",  color: '#18E1D9' }}> Google </Typography>
                 </Grid>
              <Grid item container xs>
                {skills.map(skill =><Grid key={skill} item>{skill} </Grid>)}
              </Grid>
                <Grid item container direction="column" alignItems={"flex-right"} xs>
                <Grid item>
                <Typography variant="caption"> 5 days ago | Full time | In-office </Typography>

                </Grid>
                <Grid item>
                    <Box mt ={2}>
                    <Button variant = "contained" type="submit">Check</Button>
                  </Box> 
                   </Grid>
                   </Grid>
                    </Grid>
        </Box> 
    </>
          // TODO
          // 1. Study the design and JSON
          // 2. Create the Job Board Component
          // 3. Get the data from the JSON
          // 4. Pass down the date to the JBC
          // 5. Style it.
          // 6. Filter it.
          // 7. Filter the data
          //
  )
}

