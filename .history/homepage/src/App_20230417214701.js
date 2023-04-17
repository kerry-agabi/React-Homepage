import './App.css';
import React from 'react';
import './components/FontawesomeIcons';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import { AuthProvider } from './AuthContext';
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
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
import JobseekerMenu from './JobseekerMenu';
import ViewUser from './ViewUser';
import JobCardAlgo from './components/pages/JobCardAlgo';
import Resources from './components/Resources';
import EmployeeForm from './Employee';
import UserGuide from './UserGuide';
import AdminRoute from './AdminRoute';
import RoleBasedElement from "./RoleBasedElement";
function App() {
  return (
    <div className="app-container">
      
      <Router>
        <AuthProvider>
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/resources' exact element={<Resources />} />
              <Route path="/dashboard" element={<PrivateRoute><ViewDashboard /></PrivateRoute>} />
              <PrivateRoute
        path="/viewuser"
        element={
          <RoleBasedElement allowedRoles={["jobseeker"]}>
            <ViewUser />
          </RoleBasedElement>
        }
      />
              <Route path='/recruiter-menu' exact element={<PrivateRoute><RecruiterMenu /></PrivateRoute>} />
              <Route path='/jobseeker-menu' exact element={<PrivateRoute><JobseekerMenu /></PrivateRoute>} />
              <Route path='/dashboard2' exact element={<PrivateRoute><DashboardSeeker /></PrivateRoute>} />
              <Route path='/job2' exact element={<PrivateRoute><JobCardAlgo /></PrivateRoute>} />
              <Route path='/job' exact element={<Job/>} />
              <Route path='/user-guide' exact element={<UserGuide/>} />
              <Route path='/update1' element={<AdminRoute />}>
                <Route index element={<Update />} />
              </Route>
              <Route path='/delete' element={<AdminRoute />}>
                <Route index element={<Delete />} />
              </Route>   
              <Route path="/update/:id" element={<UpdateJob />} />
              <Route path='/advertise' element={<AdminRoute />}>
                <Route index element={<Advertise />} />
              </Route>              
              <Route path='/view' element={<AdminRoute />}>
                <Route index element={<ViewApplications />} />
              </Route>
              <Route path='/view2/:jobId' exact element={<PrivateRoute><View /></PrivateRoute>} />
              <Route path="/jobapplication/:jobId" exact element={<PrivateRoute><JobApplication /></PrivateRoute>} />
              <Route path='/signup' exact element={<SignUp />} />
              <Route path='/login' exact element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
              <Route path='/churn' element={<AdminRoute />}>
                <Route index element={<EmployeeForm />} />
              </Route>

              
              
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
