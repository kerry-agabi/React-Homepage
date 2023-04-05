import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Button } from 'react-bootstrap';
import './Button.css';
import { useAuth } from '../AuthContext' // Import useAuth from AuthProvider

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
        <Link to = "/" className="navbar-logo" align="center" onClick={closeMobileMenu}>
        Recruitment Agency <i className='fa-solid fa-user-plus' paddingright='500px' />
            
             </Link>
             
             <div className='menu-icon' onClick={handleClick}>
             <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
             </div>
             <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                </Link>
                
            </li>
            <li className='nav-item'>
                <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                    Jobs
                </Link>
                
            </li>

            <li className='nav-item'>
                <Link to='/job2' className='nav-links' onClick={closeMobileMenu}>
                    Resources
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/Dashboard' className='nav-links' onClick={closeMobileMenu}>
                    Dashboard
                </Link>
                
            </li>
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
