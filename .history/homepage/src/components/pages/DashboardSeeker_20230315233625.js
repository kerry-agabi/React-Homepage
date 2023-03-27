import React, { useState } from "react";
import { rtdb } from "../../firebase";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";

function DashboardSeeker() {

    const [cvFile, setCvFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle file upload logic here
    console.log(cvFile);
  };
  const handleFileChange = (event) => {
    setCvFile(event.target.files[0]);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");


  const handlePersonalSubmit = (event) => {
    event.preventDefault();
    const jobSeekerRef = rtdb.child("jobSeekers").push();
    jobSeekerRef.set({
      firstName,
      lastName,
      email,
      phone,
      address,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  const handleExperienceSubmit = (event) => {
    event.preventDefault();
    const jobSeekerRef = rtdb.child("jobSeekers").push();
    jobSeekerRef.set({
      JobTitle,
      industry,
      CompanyName,
      location,
    });
    setJobTitle("");
    setIndustry("");
    setCompanyName("");
    setLocation("");
  };
  return (
    <div className="mt-6">
        <h1> Update Profile </h1>
      <Card className="mx-auto" style={{ width: "40rem", marginBottom: '30px'}}>
        <Card.Header> Personal Details </Card.Header>
        <Card.Body>
          <Form onSubmit={handlePersonalSubmit}>
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
              <Col >
                <Form.Group controlId="formEmail" className="mt-3">
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
                <Form.Group controlId="formPhone" className="mt-3">
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
            <Form.Group controlId="formAddress" className="mt-3">
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


      
      
      <Card className="mx-auto" style={{ width: "40rem", marginBottom: '30px' }}>
        <Card.Header>Work Experience</Card.Header>
        <Card.Body>
          <Form onSubmit={handleExperienceSubmit}>
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
                <Form.Group controlId="formCompanyName" className="mt-3" >
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
                <Form.Group controlId="formlocation" className="mt-3">
                  <Form.Label>Company Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the location"
                    value={location}
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


      <Card className="mx-auto" style={{ width: "40rem" }}>
      <Card.Header>Upload CV</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCvFile">
            <Form.Label>Choose a file</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <br>
            </br>
          <Button variant="primary" type="submit">
            Upload
          </Button>
        </Form>
      </Card.Body>
    </Card>


    </div>
   
    

    



// Work Experience

  );
}

export default DashboardSeeker;
