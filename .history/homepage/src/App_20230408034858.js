import './App.css';
import React from 'react';
import'./components/FontawesomeIcons';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home'
// import Services from './components/pages/Services'
import Products from './components/pages/Products'
import SignUp from './components/pages/SignUp'
import './components/HeroSection.css'
import { AuthProvider } from './AuthContext';
// import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Advertise from './components/pages/Advertise';
import JobCard from './components/pages/JobCard';
import Job from './Job';
import DashboardSeeker from './components/pages/DashboardSeeker';
import ViewDashboard from './components/pages/ViewDashboard';
import JobApplication from './JobApplication';
import UpdateJob from './components/pages/UpdateJob';
import Update from './components/pages/Update';
import Delete from './components/pages/Delete';
import ViewApplications from './components/pages/ViewApplications';
import View from './components/pages/View';
import Footer from './components/Footer';
import RecruiterMenu from './RecruiterMenu';


function App() {
  return (

    <div className="app-container">
      <Router>
      <AuthProvider>
 
      <Navbar/>
      <div className="app-content">
      <Routes>
        <Route path ='/' exact element = {<Home/>} />
        <Route path = "/dashboard" element={<PrivateRoute> <ViewDashboard/> </PrivateRoute>}/>
        <Route path ='/recruiter-menu' exact element = {<PrivateRoute><RecruiterMenu/></PrivateRoute>} />
        <Route path ='/dashboard2' exact element = {<PrivateRoute><DashboardSeeker/></PrivateRoute>} />
        <Route path ='/jobs' exact element = {<JobCard/>} />
        <Route path ='/job2' exact element = {<Job/>} />
        <Route path ='/products' exact element = {<Products/>} />
        <Route path ='/update1' exact element = {<Update/>} />
        <Route path ='/delete' exact element = {<Delete/>} />
        <Route path="/update/:id" element={<UpdateJob />} />
        <Route path ='/advertise' exact element = {<PrivateRoute> <Advertise/> </PrivateRoute>} />
        <Route path ='/view' exact element = {<PrivateRoute> <ViewApplications/> </PrivateRoute>} />
        <Route path ='/view2/:jobId' exact element = {<PrivateRoute> <View/> </PrivateRoute>} />
        <Route path ="/jobapplication/:jobId" exact element = {<PrivateRoute> <JobApplication/> </PrivateRoute>} />
        <Route path ='/signup' exact element = {<SignUp/>} />
        <Route path ='/login' exact element = {<Login/>} />
        <Route path="/forgot-password" element= {<ForgotPassword/>}/>
        <Route path = "/update-profile" element={<PrivateRoute> <UpdateProfile/> </PrivateRoute>}/>
      </Routes>
      <Footer />
      </div>
      </AuthProvider>
      </Router>
     
      
    </div>
    
  );
  
}

export default App;
