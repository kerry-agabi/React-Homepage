import React from 'react'
import '../App.css'
import { Firstbutton } from './Button';
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
        <Firstbutton
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Job Seeker
        </Firstbutton>
        <Firstbutton
          className="btns"
          // className="btns"
          FirstbuttonStyle="btn--outline"
          // buttonStyle="btn--primary"
          FirstbuttonSize="btn--large"
        >
             Recruiter
          {/* Employer <i className='far fa-play-circle'/> */}
        </Firstbutton>
      </div>
    </div>
  );
}

export default HeroSection

