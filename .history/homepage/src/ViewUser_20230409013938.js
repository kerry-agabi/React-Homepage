import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { db } from "./firebase";
import { useAuth } from "./AuthContext";
import { getDocs, query, where, collection } from "firebase/firestore";

function ViewUser() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const applicationsRef = collection(db, "applications");
      const userApplicationsQuery = query(
        applicationsRef,
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(userApplicationsQuery);

      const applicationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplications(applicationsData);
    };

    fetchApplications();
  }, [currentUser.uid]);

  return (
    <Container>
      <h2 className="mb-4">Your Job Applications</h2>
      {applications.map((application) => (
        <Card key={application.id} className="mb-4">
          <Card.Header>{application.jobId}</Card.Header>
          <Card.Body>
            <Card.Text>Email: {application.email}</Card.Text>
            <Card.Text>
              Name: {application.firstName} {application.lastName}
            </Card.Text>
            <Card.Text>Cover Note: {application.coverNote}</Card.Text>
            <Card.Text>
              CV File: <a href={application.cvFileURL}>Download CV</a>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ViewUser;
