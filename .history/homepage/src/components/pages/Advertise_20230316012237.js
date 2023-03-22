import React, { useState, useEffect} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db, storage} from '../../firebase'
import { Card, Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

   

   
   function Advertise() {
      const [newCompany, setNewCompany] = useState("")
      const [newContract, setNewContract] = useState("")
      const [newJobDescription, setNewJobDescription] = useState("")
      const [newJobTitle, setNewJobTitle] = useState("")
      const [newLocation, setNewLocation] = useState("")
      const [newSkills, setNewSkills] = useState("")
      const [newdate, setNewdate] = useState("")
      const [newLink, setNewLink] = useState("")
      const [imageFile, setImageFile] = useState(null);
      const [ImageURL, setImageURL] = useState('');

      const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
      
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // track upload progress here if needed
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageFile(downloadURL);
            setImageURL(downloadURL); // add this line to set the ImageURL to the downloadURL
          }
        );
      };


      const[jobs, setjobs] = useState([])
      const jobsCollectionRef = collection(db, "jobs")

      const createJob = async () => {


        await addDoc(jobsCollectionRef, {
          Company: newCompany,
          Contract: newContract,
          JobDescription: newJobDescription,
          JobTitle: newJobTitle,
          Location: newLocation,
          Skills: newSkills,
          date: newdate,
          Link: newLink,
          ImageUrl: ImageURL,

        });

      }

        
      return (
        <Container className="d-flex justify-content-center mx-auto mt-10">
        <Card style={{ width: "40rem" }}>
          <Card.Header>Advertise with us 🤳</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company Name"
                  value={newCompany}
                  onChange={(event) => setNewCompany(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formImageUpload">
                <Form.Label>Upload an Image:</Form.Label>
                <Form.Control
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Form.Group>
              <Form.Group controlId="formContract">
                <Form.Label>Contract</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contract"
                  value={newContract}
                  onChange={(event) => setNewContract(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formJobDescription">
                <Form.Label>Job description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Job Description"
                  value={newJobDescription}
                  onChange={(event) =>
                    setNewJobDescription(event.target.value)
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Enter a date:</Form.Label>
                <Form.Control
                  type="date"
                  id="my-date-input"
                  placeholder="YYYY-MM-DD"
                  value={newdate}
                  onChange={(event) => setNewdate(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formJobTitle">
                <Form.Label>Job title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job title"
                  value={newJobTitle}
                  onChange={(event) => setNewJobTitle(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={newLocation}
                  onChange={(event) => setNewLocation(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formSkills">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Skills"
                  value={newSkills}
                  onChange={(event) => setNewSkills(event.target.value)}
                />
                </Form.Group>


                <Form.Group controlId="formSkills">
                <Form.Label>Enter Job Application link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="http://example.com"
                  value={newLink}
                  onChange={(event) => setNewLink(event.target.value)}
                />
                </Form.Group>
                <br>
                </br>
                <Button onClick = {createJob} variant="primary" type="submit">
              Submit
            </Button>
                </Form>
                </Card.Body>
                  </Card>
    </Container>
     )
   }
   
    export default Advertise;