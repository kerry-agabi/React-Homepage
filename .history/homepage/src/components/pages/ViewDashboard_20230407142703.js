import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

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
      const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);
      const jobSeekerSnapshot = await getDoc(jobSeekerRef);
      setUserData(jobSeekerSnapshot.data());
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

              {userData.careerInfo ? (
                <>
                  <h4>Career Info</h4>
                  <p>
                    Job Title: {userData.careerInfo.jobTitle || "Not Provided"}
                    <br />
                    Industry: {userData.careerInfo.industry || "Not Provided"}
                  </p>
                </>
              ) : (
                <p>No career info provided.</p>
              )}

              {userData.education ? (
                <>
                  <h4>Education</h4>
                  <p>
                    Institution:{" "}
                    {userData.education.institution || "Not Provided"}
                    <br />
                    Degree: {userData.education.degree || "Not Provided"}
                    <br />
                    Field of Study:{" "}
                    {userData.education.fieldOfStudy || "Not Provided"}
                    <br />
                    Date of Graduation:{" "}
                    {userData.education.graduationDate || "Not Provided"}
                  </p>
                </>
              ) : (
                <p>No education provided.</p>
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
