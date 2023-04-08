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
        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="your Email"
              className="footer-input"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us </h2>
            <Link to="/sign-up"> How it works </Link>
            <Link to="/">Testimonials </Link>
            <Link to="/">Careers </Link>
            <Link to="/">Investors </Link>
            <Link to="/">Terms of Services </Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us </h2>
            <Link to="/sign-up"> Contact </Link>
            <Link to="/">Support </Link>
            <Link to="/">Destinations </Link>
            <Link to="/">Sponsorships </Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us </h2>
            <Link to="/sign-up"> Submit Video </Link>
            <Link to="/">Ambassadors </Link>
            <Link to="/">Agency </Link>
            <Link to="/">Influencer </Link>
          </div>
        </div>
        <div className="footer-link-items">
          <h2>Social Media </h2>
          <Link to="/sign-up">Instagram </Link>
          <Link to="/">Facebook </Link>
          <Link to="/">Youtube </Link>
          <Link to="/">Twitter  </Link>
          
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
         


       
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer
