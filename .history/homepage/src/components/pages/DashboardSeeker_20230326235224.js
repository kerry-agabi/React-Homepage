import React, { useState } from "react";
import { rtdb, storage } from "../../firebase";
import { Card, Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../AuthContext";

function DashboardSeeker() {

    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
    const [workExperiences, setWorkExperiences] = useState([{ JobTitle: "", industry: "", CompanyName: "", location: "" }]);
    const addWorkExperience = () => {
      setWorkExperiences([...workExperiences, { JobTitle: "", industry: "", CompanyName: "", location: "" }]);
    };

    const removeWorkExperience = (index) => {
      setWorkExperiences(workExperiences.filter((_, i) => i !== index));
    };
    async function handleLogout(){

        setError('')

        try{

            await logout()
            navigate("/login")

        } catch{

            setError('Failed to log out')


        }



    }

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if (!cvFile) {
        alert("Please choose a file");
        return;
      }
    
      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `cvs/${currentUser.uid}/${cvFile.name}`);
    
      // Delete the old CV file if it exists
      const jobSeekerRef = rtdb.child(`jobSeekers/${currentUser.uid}`);
      const oldCvUrlSnapshot = await jobSeekerRef.child("cvUrl").get();
      if (oldCvUrlSnapshot.exists()) {
        const oldCvUrl = oldCvUrlSnapshot.val();
        const oldCvRef = ref(storage, oldCvUrl);
        await deleteObject(oldCvRef);
      }
      // Upload the new CV file to Firebase Storage
  const uploadTask = uploadBytesResumable(storageRef, cvFile);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // You can handle progress updates here if needed
    },
    (error) => {
      console.error("Upload failed:", error);
    },
    () => {
      // Get the download URL for the uploaded file
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);

        // Store the download URL in the Realtime Database
        jobSeekerRef.update({
          cvUrl: downloadURL,
        });

        // Reset the file input
        const fileInput = document.getElementById("formCvFile");
        fileInput.value = "";
      });
    }
  );
};
const [cvFile, setCvFile] = useState(null);
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
  const jobSeekerRef = rtdb.child(`jobSeekers/${currentUser.uid}`);
  jobSeekerRef.update({
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


const handleExperienceSubmit = (event, index) => {
  event.preventDefault();
  const jobSeekerRef = rtdb.child(`jobSeekers/${currentUser.uid}/workExperiences`);
  jobSeekerRef.child(index).update(workExperiences[index]);
};
  return (
    <div className="mt-6">
      <Container>
        <Card
          className="w-100 mx-auto"
          style={{ maxWidth: "400px", marginBottom: "30px" }}
        >
          <Card.Body>
            <h2 className="text-center mb-2">Update Profile </h2>
            {error && <Alert variant="danger">{error} </Alert>}
            <strong className="text-center mb-2">Email:</strong>{" "}
            {currentUser.email}
          </Card.Body>
        </Card>

        <Card
          className="mx-auto"
          style={{ width: "40rem", marginBottom: "30px" }}
        >
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
                <Col>
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
              <br></br>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card
          className="mx-auto"
          style={{ width: "40rem", marginBottom: "25px" }}
        >
          <Card.Header>Work Experience</Card.Header>
          <Card.Body>
          {workExperiences.map((workExperience, index) => (
            <div key={index}>
          <Form key={index} onSubmit={(event) => handleExperienceSubmit(event, index)}>
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
                    <Form.Label> Industry </Form.Label>
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
                  <Form.Group controlId="formCompanyName" className="mt-3">
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
              <br></br>
              <Button className = 'mb-4' variant="primary" type="submit">
                Save
              </Button>
              <br>
            </br>

            <Button
                  className="mb-4 ml-2"
                  variant="danger"
                  onClick={() => removeWorkExperience(index)}
                >
                  Remove
                </Button>
            </Form>
            
            {index < workExperiences.length - 1 && <hr />} </div> 
             ))}
            
          
          
          <Button variant="secondary" onClick={addWorkExperience}>
          + Add another work experience
        </Button>
            
          </Card.Body>
        </Card>

        <Card
          className="mx-auto"
          style={{ width: "40rem", marginBottom: "25px" }}
        >
          <Card.Header>Upload CV</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formCvFile">
                <Form.Label>Choose a file</Form.Label>
                <Form.Control
                  type="file"
                  id="formCvFile"
                  onChange={handleFileChange}
                />
              </Form.Group>
              <br></br>
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          {" "}
          Log out{" "}
        </Button>
      </div>
    </div>

    // Work Experience
  );
}

export default DashboardSeeker;
