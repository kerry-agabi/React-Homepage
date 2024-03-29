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
import Job from './Job';
import DashboardSeeker from './components/pages/DashboardSeeker';
import UpdateDashboard from './components/pages/UpdateDashboard';


function App() {
  return (
    

   

       
    <div className="App">
      <Router>
      <AuthProvider>
       

      
      <Navbar/>
      <Routes>

        <Route path ='/' exact element = {<Home/>} />
        <Route path = "/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>}/>
        <Route path ='/dashboard2' exact element = {<PrivateRoute><DashboardSeeker/></PrivateRoute>} />
        <Route path ='/jobs' exact element = {<JobCard/>} />
        <Route path ='/job2' exact element = {<Job/>} />
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
