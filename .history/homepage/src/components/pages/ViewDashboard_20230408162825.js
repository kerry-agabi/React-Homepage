import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, onSnapshot } from 'firebase/firestore';
import "./ViewDashboard.css";
function ViewDashboard() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const jobSeekerRef = doc(collection(db, "jobSeekers"), currentUser.uid);
      onSnapshot(jobSeekerRef, (doc) => {
        const data = doc.data();
        setUserData(data);
      });
    };
  
    fetchData();
  }, [currentUser.uid]);


  return (
    <Container className="view-dashboard-container">
      <Card
       className="view-dashboard-card mx-auto"
        
      >
        <Card.Header className="view-dashboard-card-header">User Dashboard</Card.Header>
        <Card.Body className="view-dashboard-card-body">
          {userData ? (
            <>
              <h4>Personal Details</h4>
              <p>
                First Name: {userData.firstName || "Not Provided"}
                <br />
                Last Name: {userData.lastName || "Not Provided"}
                <br />
                Email: {userData.email || currentUser.email}
                <br />
                Phone: {userData.phone || "Not Provided"}
                <br />
                Address: {userData.address || "Not Provided"}
              </p>
              <div className="section-separator"> </div>
              <h4>Education</h4>
              {userData.educations ? (
                userData.educations.map((education, index) => (
                  <div key={index}>
                    <p>
                      Course Title: {education.CourseTitle || "Not Provided"}
                      <br />
                      Qualification: {education.Qualification || "Not Provided"}
                      <br />
                      Institution: {education.Institution || "Not Provided"}
                      <br />
                      Completion Date:{" "}
                      {education.CompletionDate || "Not Provided"}
                    </p>
                    {index < userData.educations.length - 1 && ( <div className="inner-section-separator"></div>)}
                  </div>
                ))
              ) : (
                <p>No education information added.</p>
              )}
              
              <div className="section-separator"></div>
              {userData.workExperiences ? (
                userData.workExperiences.map((experience, index) => (
                  <div key={index}>
                    <h4>Work Experience</h4>
                    <p>
                      Job Title: {experience.JobTitle || "Not Provided"}
                      <br />
                      Industry: {experience.industry || "Not Provided"}
                      <br />
                      Company Name: {experience.CompanyName || "Not Provided"}
                      <br />
                      Location: {experience.location || "Not Provided"}
                    </p>
                    {index < userData.workExperiences.length - 1 &&  (<div className="inner-section-separator"></div>)}
                  </div>
                ))
              ) : (
                <p>No work experience added.</p>
              )}
              <div className="section-separator"></div>
              <h4>CV</h4>
              {userData.cvUrl ? (
                <a className="view-dashboard-button" href={userData.cvUrl} target="_blank" rel="noreferrer">
                  View CV
                </a>
              ) : (
                <p>CV not uploaded.</p>
              )}
              <div className="w-100 text-center mt-2">
                <Link to="/Dashboard2">
                  <Button className="view-dashboard-button"> Update Dashboard </Button>
                </Link>
              </div>

              <div className="w-100 text-center mt-2">
                <Button variant="link" className="view-dashboard-button"onClick={handleLogout}>
                  {" "}
                  Log out{" "}
                </Button>
              </div>
            </>
          ) : (
            <div> 
            <p>Loading user data...</p>

            <Link to="/Dashboard2">
                  <Button className="view-dashboard-button"> Update Dashboard </Button>
                </Link>
                <div className="w-100 text-center mt-2">
                <Button variant="link" className="view-dashboard-button"onClick={handleLogout}>
                  {" "}
                  Log out{" "}
                </Button>
              </div>
            </div>
            
            
          )}
        </Card.Body>
      </Card>
    </Container>
    
  );
}

export default ViewDashboard;
