import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { rtdb } from "../../firebase";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom"

function ViewDashboard() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const jobSeekerRef = rtdb.child(`jobSeekers/${currentUser.uid}`);
      jobSeekerRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    };

    fetchData();
  }, [currentUser.uid]);

  return (
    <Container>
      <Card className="mx-auto" style={{ width: "40rem", marginBottom: "30px" }}>
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
              <h4>Work Experience</h4>
              <p>
                Job Title: {userData.JobTitle || "Not Provided"}
                <br />
                Industry: {userData.industry || "Not Provided"}
                <br />
                Company Name: {userData.CompanyName || "Not Provided"}
                <br />
                Location: {userData.location || "Not Provided"}
              </p>
              <h4>CV</h4>
              {userData.cvUrl ? (
                <a href={userData.cvUrl} target="_blank" rel="noreferrer">
                  View CV
                </a>
              ) : (
                <p>CV not uploaded.</p>
              )
              
              }

              <Link to = '/Dashboard2'>
              
              <Button> Update Dashboard </Button>

              </Link>
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
