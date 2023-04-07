import React, { useState, useEffect} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db, storage} from '../../firebase'
import { Card, Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

   function Advertise() {


  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();
     // Handle navigation
  const navigateToHomePage = () => {
    navigate("/");
  };

  const navigateToAdvertisePage = () => {
    navigate("/advertise");
  };
    
      const [newWorkSite, setNewWorkSite] = useState('');
      const [newCompany, setNewCompany] = useState("")
      const [newContract, setNewContract] = useState("")
      const [newJobDescription, setNewJobDescription] = useState("")
      const [newJobTitle, setNewJobTitle] = useState("")
      const [newLocation, setNewLocation] = useState("")
      const [newSkills, setNewSkills] = useState("")
      const [newdate, setNewdate] = useState("")
      const [newLink, setNewLink] = useState("")
      const [imageFile, setImageFile] = useState(null);
      const [uploadProgress, setUploadProgress] = useState(0);

      const[jobs, setjobs] = useState([])
      const jobsCollectionRef = collection(db, "jobs")


      const handleImageUpload = async () => {
        const storageRef = ref(storage, `Images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await createJob(downloadURL);
            setImageFile(null);
            setUploadProgress(0);
          }
        );
      };

        // Update createJob to include imageURL parameter
      const createJob = async (ImageUrl) => {

        const skillsArray = newSkills.split(",").map((skill) => skill.trim());


        await addDoc(jobsCollectionRef, {
          Company: newCompany,
          Contract: newContract,
          JobDescription: newJobDescription,
          JobTitle: newJobTitle,
          Location: newLocation,
          Skills: skillsArray,
          date: newdate,
          Link: newLink,
          ImageUrl: ImageUrl,
          WorkSite: newWorkSite,
         

        });

      }

       const handleSubmit = async (event) => {
        event.preventDefault();
        if (imageFile) {
          await handleImageUpload();
        } else {
          await createJob('');
        }
      
        // Reset form fields
        setNewCompany('');
        setNewWorkSite('');
        setNewContract('');
        setNewJobDescription('');
        setNewJobTitle('');
        setNewLocation('');
        setNewSkills('');
        setNewdate('');
        setNewLink('');
        setImageFile(null);
        setUploadProgress(0);
        setAlertVisible(true);

        // Hide the alert after 3 seconds
        setTimeout(() => {
          setAlertVisible(false);
        }, 10000);
      };
    
      
        
      return (
        <Container className="d-flex justify-content-center mx-auto mt-10">
          <Card style={{ width: "40rem" }}>
            <Card.Header>Advertise with us 🤳</Card.Header>
            <Card.Body>
              <Alert show={alertVisible} variant="success">
                The Job has been advertised!
                <div className="mt-3">
                  <Button
                    variant="primary"
                    onClick={navigateToHomePage}
                    className="mr-2"
                  >
                    Return to Homepage
                  </Button>
                  <Button variant="primary" onClick={navigateToAdvertisePage}>
                    Advertise More Jobs
                  </Button>
                </div>
              </Alert>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name-for-my-form">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Company Name"
                    value={newCompany}
                    onChange={(event) => setNewCompany(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="upload-for-my-form" className="mt-3">
                  <Form.Label>Company Logo</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(event) => setImageFile(event.target.files[0])}
                  />
                  {uploadProgress > 0 && (
                    <Form.Text>
                      Upload progress: {Math.round(uploadProgress)}%
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="contract-for-my-form" className="mt-3">
                  <Form.Label>Contract</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contract"
                    value={newContract}
                    onChange={(event) => setNewContract(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="worksite-for-my-form" className="mt-3">
                  <Form.Label>Work-site</Form.Label>
                  <Form.Select
                    value={newWorkSite}
                    onChange={(event) => setNewWorkSite(event.target.value)}
                  >
                    <option value="">Select Work-site</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  controlId="description-for-my-from"
                  className="mt-3"
                >
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
                <Form.Group controlId="my-date-input" className="mt-3">
                  <Form.Label>Enter a date:</Form.Label>
                  <Form.Control
                    type="date"
                    id="my-date-input"
                    placeholder="YYYY-MM-DD"
                    value={newdate}
                    onChange={(event) => setNewdate(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="Title-for-my-form" className="mt-3">
                  <Form.Label>Job title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Job title"
                    value={newJobTitle}
                    onChange={(event) => setNewJobTitle(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="location-for-my-form" className="mt-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    value={newLocation}
                    onChange={(event) => setNewLocation(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="skills-for-my-form" className="mt-3">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Skills"
                    value={newSkills}
                    onChange={(event) => setNewSkills(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="Link-for-my-form" className="mt-3">
                  <Form.Label>Enter Job Application link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="http://example.com"
                    value={newLink}
                    onChange={(event) => setNewLink(event.target.value)}
                  />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      );
      
   }
  
   
    export default Advertise;