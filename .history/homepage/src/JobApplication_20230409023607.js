import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  Alert,
} from "react-bootstrap";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase";
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "./AuthContext";
import "./JobApplication.css";

function JobApplication() {
  const { userId } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [coverNote, setCoverNote] = useState("");
  const { jobId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the user has already applied for this job
    const applicationQuery = query(
      collection(db, "applications"),
      where("userId", "==", userId),
      where("jobId", "==", jobId)
    );
    const applicationSnapshot = await getDocs(applicationQuery);

    if (!applicationSnapshot.empty) {
      alert(
        "Your last job application for this listing is still being evaluated."
      );
      return;
    }

    if (!cvFile) {
      alert("Please upload your CV before submitting.");
      return;
    }

    // Upload the CV file to Firebase Storage
    const storageRef = ref(storage, `cvs/${cvFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, cvFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can add a progress indicator here if needed
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        // Get the download URL for the uploaded CV file
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Save the job application data in Firestore
        const applicationData = {
          userId,
          jobId,
          email,
          firstName,
          lastName,
          coverNote,
          cvFileURL: downloadURL,
        };
        try {
          await addDoc(collection(db, "applications"), applicationData);
          console.log("Form submitted");
          setShowAlert(true); // Show the success alert
        } catch (error) {
          console.error("Error adding document:", error);
        }

        // Reset the form fields
        setEmail("");
        setFirstName("");
        setLastName("");
        setCvFile(null);
        setCoverNote("");
      }
    );
  };

  return (
    <Container className="job-application-container">
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
          style={{ position: "fixed", top: 0, right: 0, zIndex: 1051 }}
        >
          Job application for this listing was successful!
          <br />
          <Button
            variant="outline-success"
            className="mt-2"
            onClick={() => {
              setShowAlert(false);
              navigate("/jobseeker-menu");
            }}
          >
            Go to Job Seeker Menu
          </Button>{" "}
          <Button
            variant="outline-success"
            className="mt-2"
            onClick={() => {
              setShowAlert(false);
              navigate("/job2");
            }}
          >
            Apply for more jobs
          </Button>
        </Alert>
      )}
      <Form onSubmit={handleSubmit} className="job-application-form">
      <Row>
        <Col md={6}>
          <Card className="job-application-card mt-4 mb-4">
            <Card.Header className="job-application-card-header">
              Email
            </Card.Header>
            <Card.Body className="job-application-card-body">
                <FormControl
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Card.Body>
            </Card>

            </Col>
        <Col md={6}>
          <Card className="job-application-card mt-4 mb-4">
            <Card.Header className="job-application-card-header">
              Name
            </Card.Header>
            <Card.Body className="job-application-card-body">
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md={6}>
          <Card className="job-application-card mb-4">
            <Card.Header className="job-application-card-header">
              CV Upload
            </Card.Header>
            <Card.Body className="job-application-card-body">
            <Form.Group>
              <Form.Label>Upload your CV</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) => setCvFile(event.target.files[0])}
                required
              />
            </Form.Group>
          </Card.Body>
        </Card>
        </Col>
        <Col md={6}>
          <Card className="job-application-card mb-4">
            <Card.Header className="job-application-card-header">
              Cover Note
            </Card.Header>
            <Card.Body className="job-application-card-body">
            <Form.Group>
              <Form.Label>Write a cover note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={coverNote}
                onChange={(event) => setCoverNote(event.target.value)}
                required
              />
            </Form.Group>
          </Card.Body>
        </Card>
        </Col>
      </Row>
        <Button variant="primary" type="submit" className="job-application-button">
          Send Application
        </Button>
      </Form>
    </Container>
  );
}

export default JobApplication;
