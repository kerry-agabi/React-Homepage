import React, { useState, useEffect} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db, storage} from '../../firebase'
import { Card, Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Papa from 'papaparse';
import './UpdateJob.css'

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
  const [skillsFilter, setSkillsFilter] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

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

      const handleSkillsFilterChange = (event) => {
        setSkillsFilter(event.target.value);
        filterSkills(event.target.value);
      };

      const filterSkills = async (input) => {
        const response = await fetch(`${process.env.PUBLIC_URL}/skills.csv`);
        const csvText = await response.text();
      
        Papa.parse(csvText, {
          header: false,
          complete: (results) => {
            const skills = results.data.map((row) => row[0]);
            const filtered = skills.filter((skill) =>
              skill.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredSkills(filtered);
          },
        });
      };
      

      const addSkill = (skill) => {
        setSelectedSkills([...selectedSkills, skill]);
        setSkillsFilter('');
        setFilteredSkills([]);
      };

      const removeSkill = (skill) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
      };

        // Update createJob to include imageURL parameter
      const createJob = async (ImageUrl) => {

        const skillsarray = newSkills.split(",").map((skill) => skill.trim());


        await addDoc(jobsCollectionRef, {
          Company: newCompany,
          Contract: newContract,
          JobDescription: newJobDescription,
          JobTitle: newJobTitle,
          Location: newLocation,
         Skills: selectedSkills,
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
        setSelectedSkills('');
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
        <div className="UpdateJob"> 
        <Container className="d-flex justify-content-center mx-auto mt-10">
          <Card className="UpdateJob-card">
            <Card.Header className="UpdateJob-card-header">Advertise with us 🤳</Card.Header>
            <Card.Body className="UpdateJob-card-body">
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
                    required
                  />
                </Form.Group>

                <Form.Group controlId="upload-for-my-form" className="mt-3">
                  <Form.Label>Company Logo</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(event) => setImageFile(event.target.files[0])}
                    required
                  />
                  {uploadProgress > 0 && (
                    <Form.Text>
                      Upload progress: {Math.round(uploadProgress)}%
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="contract-for-my-form" className="mt-3">
                  <Form.Label>Contract</Form.Label>
                  <Form.Select
                    value={newContract}
                    onChange={(event) => setNewContract(event.target.value)}
                    required
                  >
                    <option disabled value="">
                      Select Contract{" "}
                    </option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Fixed-Term">Fixed-Term</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="worksite-for-my-form" className="mt-3">
                  <Form.Label>Work-site</Form.Label>
                  <Form.Select
                    value={newWorkSite}
                    onChange={(event) => setNewWorkSite(event.target.value)}
                    required
                  >
                    <option disabled value="">
                      Select Work-site
                    </option>
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
                    required
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
                    required
                  />
                </Form.Group>
                <Form.Group controlId="Title-for-my-form" className="mt-3">
                  <Form.Label>Job title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Job title"
                    value={newJobTitle}
                    onChange={(event) => setNewJobTitle(event.target.value)}
                    required
                  />

                  <Form.Group controlId="location-for-my-form" className="mt-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                      value={newLocation}
                      onChange={(event) => setNewLocation(event.target.value)}
                      required
                    >
                           <option disabled value="">
                            Select Location
                          </option>
                          <option value="Carlow">Carlow</option>
                          <option value="Cavan">Cavan</option>
                          <option value="Clare">Clare</option>
                          <option value="Cork">Cork</option>
                          <option value="Donegal">Donegal</option>
                          <option value="Dublin">Dublin</option>
                          <option value="Galway">Galway</option>
                          <option value="Kerry">Kerry</option>
                          <option value="Kildare">Kildare</option>
                          <option value="Kilkenny">Kilkenny</option>
                          <option value="Laois">Laois</option>
                          <option value="Leitrim">Leitrim</option>
                          <option value="Limerick">Limerick</option>
                          <option value="Longford">Longford</option>
                          <option value="Louth">Louth</option>
                          <option value="Mayo">Mayo</option>
                          <option value="Meath">Meath</option>
                          <option value="Monaghan">Monaghan</option>
                          <option value="Offaly">Offaly</option>
                          <option value="Roscommon">Roscommon</option>
                          <option value="Sligo">Sligo</option>
                          <option value="Tipperary">Tipperary</option>
                          <option value="Waterford">Waterford</option>
                          <option value="Westmeath">Westmeath</option>
                          <option value="Wexford">Wexford</option>
                          <option value="Wicklow">Wicklow</option>

                          <option value="Antrim">Antrim</option>
                          <option value="Armagh">Armagh</option>
                          <option value="Derry">Derry</option>
                          <option value="Down">Down</option>
                          <option value="Fermanagh">Fermanagh</option>
                          <option value="Tyrone">Tyrone</option>
                          <option disabled value="">
                          --------------------------
                          </option>
                          <option value="Work from home">Work from home</option>
                          <option value="Worldwide">Worldwide</option>
                          <option value="Africa">Africa</option>
                          <option value="North America">North America</option>
                          <option value="Middle East">Middle East</option>
                          <option value="Asia">Asia</option>
                          <option value="Europe">Europe</option>
                          <option value="Australia">Australia</option>
                          <option value="Caribbean">Caribbean</option>
                          <option value="Central America">Central America</option>
                          <option value="International">International</option>
                    </Form.Select>
                  </Form.Group>
                </Form.Group>
                <Form.Group controlId="skills-for-my-form" className="mt-3">
        <Form.Label>Skills</Form.Label>
        <div className="skills-filter-wrapper" style={{ position: 'relative' }}>
          <Form.Control
            type="text"
            placeholder="Filter by Skills"
            value={skillsFilter}
            onChange={handleSkillsFilterChange}
            style={{ width: '95%' }}
           
          />
          {filteredSkills.length > 0 && (
            <div
              className="filtered-skills-container"
              style={{
                position: 'absolute',
                zIndex: 1,
                background: 'white',
                width: '95%',
                border: '1px solid #ced4da',
                borderTop: 'none',
                maxHeight: '200px',
                overflowY: 'scroll',
              }}
            >
              {filteredSkills.map((skill, index) => (
                <div
                  key={index}
                  className="filtered-skill"
                  onClick={() => addSkill(skill)}
                  style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="selected-skills-container mt-2">
              {selectedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-primary mr-2 mb-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => removeSkill(skill)}
                >
                  {skill}{' '}
                  <span className="badge-remove-icon" style={{ marginLeft: '5px' }}>
                    &times;
                  </span>
                </span>
              ))}
            </div>
          </Form.Group>

                <Form.Group controlId="Link-for-my-form" className="mt-3">
                  <Form.Label>Enter Job Application link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="http://example.com"
                    value={newLink}
                    onChange={(event) => setNewLink(event.target.value)}
                    required
                  />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit" className="UpdateJob-button">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
        </div>
      );
      
   }
  
   
    export default Advertise;