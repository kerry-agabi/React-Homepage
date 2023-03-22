import React from 'react'
import '../App.css'
import { Button } from './Button';
import './HeroSection.css'
import video from '../videos/video-2.mp4'

console.log(video);


function HeroSection() {
  
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
        <Button
          className=""
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Job Seeker
        </Button>
        <Button
          className="btns"
          // className="btns"
          buttonStyle="btn--outline"
          // buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
             Recruiter
          {/* Employer <i className='far fa-play-circle'/> */}
        </Button>
      </div>
    </div>
  );
}

export default HeroSection

