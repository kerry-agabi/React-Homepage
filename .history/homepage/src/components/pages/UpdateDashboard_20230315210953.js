import { useState, useEffect } from "react";
import { auth, rtdb } from '../../firebase';
import {useAuth} from './AuthContext'

import {ref, set, get, update, remove, child } from "firebase/database"


function Dashboard() {
  const [jobSeekerData, setJobSeekerData] = useState(null);

  useEffect(() => {
    // Get the current authenticated user
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Get the job seeker data for the current user
      const jobSeekersRef = rtdb.child("jobSeekers");
      jobSeekersRef
        .orderByChild("uid")
        .equalTo(currentUser.uid)
        .once("value")
        .then((snapshot) => {
          const jobSeekerData = snapshot.val();
          setJobSeekerData(jobSeekerData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  if (!jobSeekerData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {jobSeekerData.firstName}!</h1>
      <h2>Your Information</h2>
      <p>First Name: {jobSeekerData.firstName}</p>
      <p>Last Name: {jobSeekerData.lastName}</p>
      <p>Email: {jobSeekerData.email}</p>
      <p>Phone: {jobSeekerData.phone}</p>
     
    </div>
  );
}

export default Dashboard;
