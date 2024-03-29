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
              <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["jobseeker"]}>
              <ViewDashboard />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />
              <Route
        path="/viewuser"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["jobseeker"]}>
              <ViewUser />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />

<Route
        path="/recruiter-menu"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <RecruiterMenu />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />

<Route
        path="/jobseeker-menu"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["jobseeker"]}>
              <JobseekerMenu />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />

<Route
        path="/dashboard2"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["jobseeker"]}>
              <DashboardSeeker />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />

      <Route
        path="/job2"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["jobseeker"]}>
              <JobCardAlgo />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />
              <Route path='/job' exact element={<Job/>} />


              <Route
        path="/user-guide"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <UserGuide />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />

<Route
        path="/update1"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <Update />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />

<Route
        path="/delete"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <Delete />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />
             
             <Route
        path="/update/:id"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <UpdateJob />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />  
              <Route
        path="/advertise"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <Advertise />
            </RoleBasedElement>
          </PrivateRoute>
        }
      />      

<Route
        path="/view"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <ViewApplications />
            </RoleBasedElement>
          </PrivateRoute>
        }
      /> 

<Route
        path="/view"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <ViewApplications />
            </RoleBasedElement>
          </PrivateRoute>
        }
      /> 

<Route
        path="/view2/:jobId"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <View/>
            </RoleBasedElement>
          </PrivateRoute>
        }
      /> 

<Route
        path="/jobapplication/:jobId"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["jobseeker"]}>
              <JobApplication/>
            </RoleBasedElement>
          </PrivateRoute>
        }
      /> 
              <Route path='/signup' exact element={<SignUp />} />
              <Route path='/login' exact element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />

              <Route
        path="/churn"
        element={
          <PrivateRoute>
            <RoleBasedElement allowedRoles={["recruiter"]}>
              <EmployeeForm/>
            </RoleBasedElement>
          </PrivateRoute>
        }
      /> 
            
              
              
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
