import { useState, useEffect } from "react";
import { auth, rtdb } from '../../firebase';


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
        .on("value", (snapshot) => {
          const jobSeekerData = snapshot.val();
          setJobSeekerData(jobSeekerData);
        });
    }
  }, []);

 

  return (
    <div>
      {jobSeekerData ? (
        <div>
          <h1>Welcome, {jobSeekerData.firstName}!</h1>
          <h2>Your Information</h2>
          <p>First Name: {jobSeekerData.firstName}</p>
          <p>Last Name: {jobSeekerData.lastName}</p>
          <p>Email: {jobSeekerData.email}</p>
          <p>Phone: {jobSeekerData.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
