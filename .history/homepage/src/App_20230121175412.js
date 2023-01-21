import './App.css';
import React from 'react';
import'./components/FontawesomeIcons';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-solid-svg-icons'
import Home from './components/pages/Home'
import Services from './components/pages/Services'
import Products from './components/pages/Products'
import SignUp from './components/pages/SignUp'
import './components/HeroSection.css'
import { AuthProvider } from './AuthContext';



function App() {
  return (
    

   

       
    <div className="App">
      <Router>
      <AuthProvider>
       

      
      <Navbar/>
      <Routes>

        <Route path ='/' exact element = {<Home/>} />
        <Route path ='/services' exact element = {<Services/>} />
        <Route path ='/products' exact element = {<Products/>} />
        <Route path ='/signup' exact element = {<SignUp/>} />



      </Routes>
      </AuthProvider>
      </Router>
      
    </div>
    
  );
  
}

export default App;
