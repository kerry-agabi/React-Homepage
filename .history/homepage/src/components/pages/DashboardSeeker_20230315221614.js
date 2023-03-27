import React, { useState } from "react";
import { rtdb } from "../../firebase";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

function DashboardSeeker() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    const jobSeekerRef = rtdb.child("jobSeekers").push();
    jobSeekerRef.set({
      firstName,
      lastName,
      email,
      phone,
      address,
      JobTitle,
      industry,
      CompanyName,
      location,

    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setJobTitle("");
    setIndustry("");
    setCompanyName("");
    setLocation("");


  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <Card style={{ width: "40rem" }}>
        <Card.Header>Update Dashboard</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Form.Group>
            <br>
            </br>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>


      
      <div className="d-flex justify-content-center mt-4">
      <Card style={{ width: "40rem" }}>
        <Card.Header>Work Experience</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formJobTitle">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Job Title"
                    value={JobTitle}
                    onChange={(event) => setJobTitle(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formindustry">
                  <Form.Label> industry </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the industry"
                    value={industry}
                    onChange={(event) => setIndustry(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formCompanyName">
                  <Form.Label>Company Name </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Company Name"
                    value={CompanyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formlocation">
                  <Form.Label>Company Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the location"
                    value={Location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Form.Group> */}
            <br>
            </br>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    </div>

    



// Work Experience

  );
}

export default DashboardSeeker;
