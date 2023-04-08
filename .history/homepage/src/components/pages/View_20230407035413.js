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
import { useParams, useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

function View() {
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams();
  const { state } = useLocation();
  const matchedJobseekers = state.matchedJobseekers;

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
      <h2 className="mt-4 mb-4">Job Applications</h2>
      {matchedJobseekers.map((jobseeker) => (
        <Card key={jobseeker.id} className="mb-4">
          <Card.Header>
            {jobseeker.firstName} {jobseeker.lastName}
            <Badge className="ml-2">{jobseeker.email}</Badge>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <ListGroup>
                  <ListGroupItem>
                    <strong>Skills:</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    {jobseeker.skills && jobseeker.skills.join(', ')}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroupItem>
                    <strong>Location:</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    {jobseeker.address}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Contract Preference:</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    {jobseeker.contractPreference}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Worksite Preference:</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    {jobseeker.worksitePreference}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default View;
