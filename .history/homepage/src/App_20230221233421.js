import './App.css';
import React from 'react';
import'./components/FontawesomeIcons';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home'
import Services from './components/pages/Services'
import Products from './components/pages/Products'
import SignUp from './components/pages/SignUp'
import './components/HeroSection.css'
import { AuthProvider } from './AuthContext';
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Advertise from './components/pages/Advertise';
import JobCard from './components/pages/JobCard';


function App() {
  return (
    

   

       
    <div className="App">
      <Router>
      <AuthProvider>
       

      
      <Navbar/>
      <Routes>

        <Route path ='/' exact element = {<Home/>} />
        <Route path = "/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>}/>
        <Route path ='/services' exact element = {<JobCard/>} />
        <Route path ='/products' exact element = {<Products/>} />
        <Route path ='/advertise' exact element = {<PrivateRoute> <Advertise/> </PrivateRoute>} />
        <Route path ='/signup' exact element = {<SignUp/>} />
        <Route path ='/login' exact element = {<Login/>} />
        <Route path="/forgot-password" element= {<ForgotPassword/>}/>
        <Route path = "/update-profile" element={<PrivateRoute> <UpdateProfile/> </PrivateRoute>}/>






      </Routes>
      </AuthProvider>
      </Router>
      
    </div>
    
  );
  
}

export default App;
