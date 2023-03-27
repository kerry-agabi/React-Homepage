import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";

function JobApplication() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [coverNote, setCoverNote] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission and reset the form fields
    console.log("Form submitted");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Header>Email</Card.Header>
              <Card.Body>
                <FormControl
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mb-4">
              <Card.Header>Name</Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Card className="mb-4">
          <Card.Header>CV Upload</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Upload your CV</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) => setCvFile(event.target.files[0])}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card className="mb-4">
          <Card.Header>Cover Note</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Write a cover note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={coverNote}
                onChange={(event) => setCoverNote(event.target.value)}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <Button variant="primary" type="submit">
          Send Application
        </Button>
      </Form>
    </Container>
  );
}

export default JobApplication;
