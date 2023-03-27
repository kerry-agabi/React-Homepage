import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Button } from 'react-bootstrap';
import './Button.css';
import { useAuth } from './AuthProvider'; // Import useAuth from AuthProvider

function Navbar() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { currentUser, logout } = useAuth(); // Get currentUser and logout from useAuth

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 920) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleAuthButton = async () => {
    if (currentUser) {
      try {
        await logout(); // Call the logout function from useAuth
        navigate('/');
      } catch (error) {
        console.log('Failed to log out', error);
      }
    } else {
      navigate('/signup');
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* ... */}
          <ul>
          <li className="nav-item">
            <Link
              to={currentUser ? '/logout' : '/signup'}
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              {currentUser ? 'Logout' : 'Sign up'}
            </Link>
          </li>
        </ul>
        <Button
          className="w-15"
          style={{ position: 'static' }}
          onClick={handleAuthButton}
        >
          {currentUser ? 'Logout' : 'Sign Up'}
        </Button>
      </div>
      </nav>
    </>
  );
}

export default Navbar;
