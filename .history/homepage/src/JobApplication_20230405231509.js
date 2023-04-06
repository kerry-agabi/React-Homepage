import React, { useState } from "react";
import {Card,Form,Button,Container,Row,Col,FormControl} from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from './firebase';
import { useParams } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";


function JobApplication() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [coverNote, setCoverNote] = useState("");
  const { jobId } = useParams();


  const handleSubmit = async (event) => {
    event.preventDefault();
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
          jobId,
          email,
          firstName,
          lastName,
          coverNote,
          cvFileURL: downloadURL, // Store the CV download URL in the database
        };
        try {
          await addDoc(collection(db, "applications"), applicationData);
          console.log("Form submitted");
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
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Card className="mt-4 mb-4">
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
