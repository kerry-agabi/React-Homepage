import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Dashboard from '../Dashboard';
import video from '../videos/video-2.mp4';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="video-container">
        <video src={video} autoPlay loop muted />
      </div>
      <h1>Recruitment Agency</h1>
      <p>Apply or Advertise with us!</p>
      <div className="hero-btns">
        <Button onClick={() => navigate('/job2')} className="btns btn-mobile">
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
