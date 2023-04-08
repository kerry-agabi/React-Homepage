import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";


function View({ matchedJobseekers }) {
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams();

  useEffect(() => {
    const fetchApplications = async () => {
      const applicationsRef = collection(db, "applications");
      const q = query(applicationsRef, where("jobId", "==", jobId));
      const querySnapshot = await getDocs(q);
      setApplications(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchApplications();
  }, [jobId]);

  return (

   

<Container>
      {matchedJobseekers.map((jobseeker) => (
        <Card className="mb-3" key={jobseeker.id}>
          <Card.Body>
            <Card.Title>
              {jobseeker.firstName} {jobseeker.lastName}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Matching Score: {jobseeker.matchingScore}
            </Card.Subtitle>
            <Card.Text>Skills: {jobseeker.skills.join(', ')}</Card.Text>
            <Card.Text>Location: {jobseeker.location}</Card.Text>
            <Card.Text>Contract Type: {jobseeker.contractPreference}</Card.Text>
            <Card.Text>Worksite Type: {jobseeker.worksitePreference}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>

    
    
  );
}

export default View;
