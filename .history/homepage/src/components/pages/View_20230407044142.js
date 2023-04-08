import React from "react";
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

function View() {
  const { jobId } = useParams();
  const { state } = useLocation();
  const matchedJobSeekers = state?.matchedJobSeekers;

  return (
    <Container>
      <h2 className="mt-4 mb-4">Job Applications</h2>
      {matchedJobSeekers &&
        matchedJobSeekers.map((jobSeeker) => (
          <Card key={jobSeeker.id} className="mb-4">
            <Card.Header>
              {jobSeeker.firstName} {jobSeeker.lastName}
              <Badge className="ml-2">{jobSeeker.email}</Badge>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <ListGroup>
                    <ListGroupItem>
                      <strong>Skills:</strong>
                    </ListGroupItem>
                    <ListGroupItem>
                      {jobSeeker.skills && jobSeeker.skills.join(", ")}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup>
                    <ListGroupItem>
                      <strong>Location:</strong>
                    </ListGroupItem>
                    <ListGroupItem>{jobSeeker.address}</ListGroupItem>
                    <ListGroupItem>
                      <strong>Contract Preference:</strong>
                    </ListGroupItem>
                    <ListGroupItem>
                      {jobSeeker.contractPreference}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Worksite Preference:</strong>
                    </ListGroupItem>
                    <ListGroupItem>
                      {jobSeeker.worksitePreference}
                    </ListGroupItem>s
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
