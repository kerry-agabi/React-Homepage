import React from 'react'
import '../App.css'
// import { Button } from './Button';
import {Button} from 'react-bootstrap'

import './HeroSection.css'
import video from '../videos/video-2.mp4'
import {useNavigate, Route} from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import Dashboard from '../Dashboard'


console.log(video);


function HeroSection() {
const navigate = useNavigate();

  
  return (
    
    <div className='hero-container'>
  <video src = {video} autoPlay loop muted />
      <br>
</br>
      <h1> Recruitment Agency</h1>

      <p>Apply or Advertise with us!</p>
      <br>
</br>
<br>
</br>
      <div className="hero-btns">
        {/* <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Job Seeker
        </Button> */}

<Button onClick={() => navigate('/products') }> Job Seeker</Button>

        {/* <Button
          className="btns"
          // className="btns"
          buttonStyle="btn--outline"
          // buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
             Recruiter
          {/* Employer <i className='far fa-play-circle'/> */}
        {/* </Button>  */}
        <Button onClick={() => navigate('/advertise')}>
 Recruiter</Button>

      </div>
    </div>
  );
}

export default HeroSection

