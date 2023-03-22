import React, {useState, useEffect} from 'react'
import { Nav } from 'react-bootstrap'
import {form, Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ReactDom from 'react-dom'
import ReactDOM from 'react-dom'
import { Library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'
// import { Button } from './Button'
//import {  } from 'bootstrap'
 

function Navbar() {

    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)


    const showButton = () => {
        if(window.innerWidth <= 920){

            setButton(false);

        }

        else{

            setButton(true)
        }
    }

        useEffect(()=>{

            showButton()
        }, [])

        window.addEventListener('resize', showButton)

  return (
   
      <>
      <nav className='navbar'>
      <div className='navbar-container'>

        <Link to = "/" className="navbar-logo" align="center" onClick={closeMobileMenu}>
        Recruitment Agency <i className='fa-solid fa-user-plus' paddingRight='500px' />
            
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
                <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                    Employees
                </Link>
                
            </li>

            <li className='nav-item'>
                <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                    Resources
                </Link>
            </li>

            <li className='nav-item'>
                <Link to='/signup' className='nav-links-mobile' onClick={closeMobileMenu}>
                    Sign up
                </Link>
                
            </li>
                
            
             </ul>
            
                        
             <Button >Sign Up</Button>
      </div>
      </nav>
      </>
    
  )
}

export default Navbar
