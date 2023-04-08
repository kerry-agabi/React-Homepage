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
      <h2 className="mt-4 mb-4">Job Applications</h2>
      {applications.map((application) => (
        <Card key={application.id} className="mb-4">
          <Card.Header>
            {application.firstName} {application.lastName}
            <Badge className="ml-2">{application.email}</Badge>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <ListGroup>
                  <ListGroupItem>
                    <strong>Cover Note:</strong>
                  </ListGroupItem>
                  <ListGroupItem>{application.coverNote}</ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroupItem>
                    <strong>CV:</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    <a
                      href={application.cvFileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download CV
                    </a>
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
