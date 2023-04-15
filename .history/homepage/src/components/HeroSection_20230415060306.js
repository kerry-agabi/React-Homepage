import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import video from '../videos/video-2.mp4';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="video-container">
        <video src={video} autoPlay loop muted playsInline />
      </div>
      <h1 className='mt-4'>Recruitment Agency</h1>
      <p>Apply or Advertise with us!</p>
      <div className="hero-btns">
        <Button onClick={() => navigate('/jobseeker-menu')} className="btns btn-mobile">
          Job Seeker
        </Button>
        <Button onClick={() => navigate('/recruiter-menu')} className="btns btn-mobile">
          Recruiter
        </Button> 
      </div>
    </div>
  );
}
 
export default HeroSection;
