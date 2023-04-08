import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
      const jobSeekerRef = db
        .collection("jobSeekers")
        .doc(currentUser.uid);
      jobSeekerRef.onSnapshot((doc) => {
        const data = doc.data();
        setUserData(data);
      });
    };

    fetchData();
  }, [currentUser.uid]);


  return (
    <Container>
      <Card
        className="mx-auto"
        style={{ width: "40rem", marginBottom: "30px" }}
      >
        <Card.Header>User Dashboard</Card.Header>
        <Card.Body>
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
                    {index < userData.educations.length - 1 && <hr />}
                  </div>
                ))
              ) : (
                <p>No education information added.</p>
              )}

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
                    {index < userData.workExperiences.length - 1 && <hr />}
                  </div>
                ))
              ) : (
                <p>No work experience added.</p>
              )}
              <h4>CV</h4>
              {userData.cvUrl ? (
                <a href={userData.cvUrl} target="_blank" rel="noreferrer">
                  View CV
                </a>
              ) : (
                <p>CV not uploaded.</p>
              )}
              <div className="w-100 text-center mt-2">
                <Link to="/Dashboard2">
                  <Button className="text-center"> Update Dashboard </Button>
                </Link>
              </div>

              <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                  {" "}
                  Log out{" "}
                </Button>
              </div>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ViewDashboard;
