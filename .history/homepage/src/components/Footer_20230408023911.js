import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faEthereum, faInstagram, faYoutube, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';



function Footer() {
  return (
    <div className="footer-container">
      <section className="section.footer-subscription">
        <p className="footer-subscription-heading">
          Join the advanced newsletter to receive important updates
        </p>
        <FontAwesomeIcon icon={faFacebookF} />
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Contact Us </h2>
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
          <Link to="/sign-up">Instagram <FontAwesomeIcon icon={faInstagram} /> </Link>
          <Link to="https://github.com/kerry-agabi">Facebook <FontAwesomeIcon icon={faFacebookF} /> </Link>
          <Link to="/">Youtube <FontAwesomeIcon icon={faYoutube} /> </Link>
          <Link to="/">Twitter  <FontAwesomeIcon icon={faTwitter} />  </Link>
          
        </div>
      </div>

     
    </div>
  );
}

export default Footer
