import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faEthereum, faInstagram, faYoutube, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';



function Footer() {
  return (
    <div className="footer-container">
      <section className="section.footer-subscription">
      
        
        
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
          <h3>Contact</h3>
            <Link to="/sign-up"> Contact </Link>
            <Link to="/">Support </Link>
            <Link to="/">Destinations </Link>
            <Link to="/">Sponsorships </Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
        </div>
        <div className="footer-link-items">
          <h3>Social Media </h3>
          <Link to="https://www.instagram.com/kerryagabi/">Instagram <FontAwesomeIcon icon={faInstagram} /> </Link>
          <Link to="https://ie.linkedin.com/in/kerry-agabi-38272a218">LinkedIn <FontAwesomeIcon icon={faLinkedin} /> </Link>
          <Link to="https://github.com/kerry-agabi">Github<FontAwesomeIcon icon={faGithub} />  </Link>
          
        </div>
      </div>

     
    </div>
  );
}

export default Footer
