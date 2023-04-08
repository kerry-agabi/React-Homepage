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
import { db, rtdb } from "../../firebase";
import { get, ref } from "firebase/database";
import { calculateMatchingScore } from "./ViewApplications/ViewApplications";

function View() {
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams();
  
  useEffect(() => {
    const fetchApplicationsAndJobSeekers = async () => {
      const applicationsRef = collection(db, "applications");
      const applicationsQuery = query(applicationsRef, where("jobId", "==", jobId));
      const applicationsSnapshot = await getDocs(applicationsQuery);
  
      const mergedApplications = [];
  
      for (const docSnapshot of applicationsSnapshot.docs) {
        const applicationData = docSnapshot.data();
        const jobSeekerRef = ref(rtdb, `jobSeekers/${applicationData.jobSeekerId}`);
        const jobSeekerSnapshot = await get(jobSeekerRef);
  
        if (jobSeekerSnapshot.exists()) {
          const jobSeekerData = jobSeekerSnapshot.val();
          mergedApplications.push({
            ...applicationData,
            ...jobSeekerData,
            id: docSnapshot.id,
          });
        }
      }
  
      // Sort the applications based on the job-matching algorithm
      mergedApplications.sort((a, b) => {
        return calculateMatchingScore(a, b) - calculateMatchingScore(b, a);
      });
  
      setApplications(mergedApplications);
    };
  
    fetchApplicationsAndJobSeekers();
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
                    <strong>Skills:</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    {application.skills && application.skills.join(', ')}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroupItem>
                    <strong>Location:</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    {application.address}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Contract Preference:</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    {application.contractPreference}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Worksite Preference:</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    {application.worksitePreference}
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