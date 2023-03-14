import React from 'react'
import { Link } from 'react-router-dom'
import { TestButton } from './Button'
import './Footer.css'
import { Library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Footer() {
  return (
    <div className="footer-container">
      <section className="section.footer-subscription">
        <p className="footer-subscription-heading">
          Join the advanced newsletter to receive important updates
        </p>
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
            <TestButton buttonStyle="btn--outline">Subscribe</TestButton>
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
          <Link to="/">Twitter </Link>
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
          <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link linkedin'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
              
            </Link>

       
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer
