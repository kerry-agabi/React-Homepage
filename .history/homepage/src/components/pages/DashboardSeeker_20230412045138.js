import React, { useState, useEffect } from "react";
import { rtdb, db, storage } from "../../firebase";
import { Card, Form, Button, Row, Col, Container, Alert, Badge } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, getDoc, setDoc, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../AuthContext";
import './DashboardSeeker.css'
import { Spinner } from "react-bootstrap";
import { IonAvatar } from '@ionic/react';
import Papa from 'papaparse';
import Select from "react-select";
import './skills.csv'


function DashboardSeeker() {
    const { updateEmail } = useAuth();
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
    const [isEmployed, setIsEmployed] = useState(false);
    const [salaryExpectation, setSalaryExpectation] = useState("");
    const [contractPreference, setContractPreference] = useState("");
    const [worksitePreference, setWorksitePreference] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [skills, setSkills] = useState([{ selected: "" }]);
    const [availableSkills, setAvailableSkills] = useState([]);
    const [csvSkills, setCsvSkills] = useState([]);
    
    const [loadingData, setLoadingData] = useState(true);
    const [fetchedProfilePhotoUrl, setFetchedProfilePhotoUrl] = useState("");
    const [fetchedCvUrl, setFetchedCvUrl] = useState(null);

    const handleCsvFile = (data) => {
      const skillsArray = data.map((row) => row.data[0]);
      setCsvSkills(skillsArray);
    };

    
    useEffect(() => {
      async function fetchData() {
        const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);
        const docSnap = await getDoc(jobSeekerRef);
    
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
        }
        setLoadingData(false);
      }
    
      fetchData();
    }, [currentUser.uid, db]);

    const [workExperiences, setWorkExperiences] = useState([
      {
        JobTitle: "",
        industry: "",
        CompanyName: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
      },
    ]);
    const addWorkExperience = () => {
      setWorkExperiences([
        ...workExperiences,
        { JobTitle: "", industry: "", CompanyName: "", location: "" },
      ]);
    };
    const removeWorkExperience = (index) => {
      setWorkExperiences(workExperiences.filter((_, i) => i !== index));
    };
    const [educations, setEducations] = useState([
      {
        CourseTitle: "",
        Qualification: "",
        Institution: "",
        CompletionDate: "",
      },
    ]);

    // Add education form
    const addEducation = () => {
      setEducations([
        ...educations,
        {
          CourseTitle: "",
          Qualification: "",
          Institution: "",
          CompletionDate: "",
        },
      ]);
    };
    // Remove education form
    const removeEducation = (index) => {
      setEducations(educations.filter((_, i) => i !== index));
    };

  const resetEducationFields = (index) => {
    const newEducations = [...educations];
    newEducations[index] = {
      CourseTitle: "",
      Qualification: "",
      Institution: "",
      CompletionDate: "",
    };
    setEducations(newEducations);
  };

  useEffect(() => {
    async function fetchData() {
      setLoadingData(true);

      // Get the existing jobSeeker data from Firestore
      const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);
      const docSnap = await getDoc(jobSeekerRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.educations && data.educations.length > 0) {
          setEducations(data.educations);
        }
      }
      setLoadingData(false);
    }

    fetchData();
  }, [currentUser.uid, db]);

  const handleEducationSubmit = async (event, index) => {
    event.preventDefault();
    const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);

    // Update the educations array with the new or updated education
    const newEducations = [...educations];
    newEducations[index] = educations[index];
    await updateDoc(jobSeekerRef, {
      educations: newEducations,
    });

    resetEducationFields(index);
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

  

useEffect(() => {
  async function fetchData() {
    setLoadingData(true);

    // Get the existing jobSeeker data from Firestore
    const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);
    const docSnap = await getDoc(jobSeekerRef);

    if (docSnap.exists()) {
      // Set fetchedCvUrl to the existing CV URL if it exists
      if (docSnap.data().cvUrl) {
        setFetchedCvUrl(docSnap.data().cvUrl);
      }
    }
    setLoadingData(false);
  }

  fetchData();
}, [currentUser.uid, db]);


    

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if (!cvFile) {
        alert("Please choose a file");
        return;
      }
      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `cvs/${currentUser.uid}/${cvFile.name}`);
      
      // Get the existing CV URL from Firestore
      const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);
      const jobSeekerSnapshot = await getDoc(jobSeekerRef);
    
      // Delete the old CV file if it exists
      if (jobSeekerSnapshot.exists() && jobSeekerSnapshot.data().cvUrl) {
        const oldCvUrl = jobSeekerSnapshot.data().cvUrl;
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
        async () => {
          // Get the download URL for the uploaded file
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
    
          // Store the download URL in Firestore
          await updateDoc(jobSeekerRef, {
            cvUrl: downloadURL,
          });
    
          // Reset the file input
          const fileInput = document.getElementById("formCvFile");
          fileInput.value = "";
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

 const handlePersonalSubmit = async (event) => {
  event.preventDefault();
  const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);

  try {
    await updateEmail(email);
    setError(""); // Clear any previous error messages
  } catch (error) {
    // Set the error message
    setError("Failed to update email. " + error.message);
  }

  await setDoc(jobSeekerRef, {
    firstName,
    lastName,
    email,
    phone,
    address,
  }, { merge: true });

  setFirstName("");
  setLastName("");
  setEmail("");
  setPhone("");
  setAddress("");
};
  
const resetWorkExperienceFields = (index) => {
  const newWorkExperiences = [...workExperiences];
  newWorkExperiences[index] = {
    JobTitle: "",
    industry: "",
    CompanyName: "",
    location: "",
  };
  setWorkExperiences(newWorkExperiences);
};

useEffect(() => {
  async function fetchData() {
    const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);
    const docSnap = await getDoc(jobSeekerRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.workExperiences && data.workExperiences.length > 0) {
        setWorkExperiences(data.workExperiences);
      }
    }
    setLoadingData(false);
  }

  fetchData();
}, [currentUser.uid, db]);

const handleExperienceSubmit = async (event, index) => {
  event.preventDefault();
  const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);

  // Update the workExperiences array with the new work experience
  const newWorkExperiences = [...workExperiences];
  newWorkExperiences[index] = workExperiences[index];
  await updateDoc(jobSeekerRef, {
    workExperiences: newWorkExperiences,
  });

  resetWorkExperienceFields(index);
};

const resetCareerInfoForm = () => {
  setIsEmployed(false);
  setSalaryExpectation("");
  setContractPreference("");
  setWorksitePreference("");
  setSkills([{ selected: "" }]); // Reset skills to have one empty dropdown
};

useEffect(() => {
  async function fetchData() {
    const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);
    const docSnap = await getDoc(jobSeekerRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.isEmployed !== undefined) setIsEmployed(data.isEmployed);
      if (data.salaryExpectation) setSalaryExpectation(data.salaryExpectation);
      if (data.contractPreference) setContractPreference(data.contractPreference);
      if (data.worksitePreference) setWorksitePreference(data.worksitePreference);
      if (data.skills) {
        setSkills(
          data.skills.map((skill) => ({
            selected: skill,
          }))
        );
      }      
    }
    setLoadingData(false);
  }

  fetchData();
}, [currentUser.uid, db]);


const handleCareerInfoSubmit = async (event) => {
  event.preventDefault();
  const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);

  // Extract only the selected skill values
  const selectedSkills = skills
    .filter((skillObj) => skillObj.selected)
    .map((skillObj) => skillObj.selected);

  const updateData = {
    isEmployed,
    salaryExpectation,
    contractPreference,
    worksitePreference,
    skills: selectedSkills, // Store only the selected skill values
  };

  // Remove any undefined fields before calling updateDoc
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });

  await updateDoc(jobSeekerRef, updateData);
  resetCareerInfoForm();
};




const handleEmploymentStatusChange = (status) => {
  setIsEmployed(status);
};


useEffect(() => {
  async function fetchSkills() {
    const response = await fetch("/skills.csv");
    const csvData = await response.text();
    const parsedData = Papa.parse(csvData, { header: false, skipEmptyLines: true });
    const skillsArray = parsedData.data.map((row) => ({ label: row[0], value: row[0] }));
    setCsvSkills(skillsArray);
  }
  fetchSkills();
}, []);


const handleSkillChange = (newValue, index) => {
  const newSkills = [...skills];
  newSkills[index].selected = newValue ? newValue.value : "";
  setSkills(newSkills);
};
const removeSkill = (skill) => {
  setSkills((prevSkills) =>
    prevSkills.map((skillObj) => {
      if (skillObj.selected === skill) {
        return { ...skillObj, selected: "" };
      } else {
        return skillObj;
      }
    })
  );
};

const addSkillDropdown = () => {
  setSkills([...skills, { selected: "" }]);
};


useEffect(() => {
  async function fetchData() {
    setLoadingData(true);

    // Get the existing jobSeeker data from Firestore
    const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);
    const docSnap = await getDoc(jobSeekerRef);

    if (docSnap.exists()) {
      // Set fetchedProfilePhotoUrl to either the existing profile photo URL or the default avatar URL
      const profilePhotoUrl = docSnap.data().profilePhoto
        ? docSnap.data().profilePhoto
        : "https://ionicframework.com/docs/img/demos/avatar.svg";
      setFetchedProfilePhotoUrl(profilePhotoUrl);
    } else {
      // Set fetchedProfilePhotoUrl to the default avatar URL if no data exists
      setFetchedProfilePhotoUrl("https://ionicframework.com/docs/img/demos/avatar.svg");
    }
    setLoadingData(false);
  }

  fetchData();
}, [currentUser.uid, db]);


const handleProfilePhotoSubmit = async (event) => {
  event.preventDefault();

  if (!profilePhoto) {
    alert("Please choose a file");
    return;
  }

  // Create a reference to the file in Firebase Storage
  const storageRef = ref(storage, `profilePhotos/${currentUser.uid}/${profilePhoto.name}`);

  // Get the existing profile photo URL from Firestore
  const jobSeekerRef = doc(db, "jobSeekers", currentUser.uid);
  const jobSeekerSnapshot = await getDoc(jobSeekerRef);

  // Delete the old profile photo if it exists
  if (jobSeekerSnapshot.exists() && jobSeekerSnapshot.data().profilePhoto) {
    const oldPhotoUrl = jobSeekerSnapshot.data().profilePhoto;
    const oldPhotoRef = ref(storage, oldPhotoUrl);
    await deleteObject(oldPhotoRef);
  }

  // Upload the new profile photo to Firebase Storage
  const uploadTask = uploadBytesResumable(storageRef, profilePhoto);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // You can handle progress updates here if needed
    },
    (error) => {
      console.error("Upload failed:", error);
    },
    async () => {
      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("File available at", downloadURL);

      // Store the download URL in Firestore
      await updateDoc(jobSeekerRef, {
        profilePhoto: downloadURL,
      });

      // Update the fetched profile photo URL
    

      // Reset the file input
      const fileInput = document.getElementById("formProfilePhoto");
      fileInput.value = "";
    }
  );
};

const handleProfilePhotoChange = (event) => {
  setProfilePhoto(event.target.files[0]);
};


//start
  return (
    <div className="mt-6">
      <Container>
        <Card
          className="w-100 mx-auto"
          style={{ maxWidth: "400px", marginBottom: "30px" }}
        >
          <Card.Header>Update Dashboard</Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error} </Alert>}
            <strong className="text-center mb-2">Email:</strong>{" "}
            {currentUser.email}
          </Card.Body>
        </Card>

        <Card
          className="mx-auto"
          style={{ width: "40rem", marginBottom: "25px" }}
        >
          <Card.Header>Profile Photo</Card.Header>
          <Card.Body>
            {fetchedProfilePhotoUrl ? (
              <img
                src={fetchedProfilePhotoUrl}
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "15px",
                }}
              />
            ) : (
              <IonAvatar>
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
            )}
            <Form onSubmit={handleProfilePhotoSubmit}>
              <Form.Group controlId="formProfilePhoto">
                <Form.Label>Upload Profile Photo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card
          className="mx-auto"
          style={{ width: "60rem", marginBottom: "25px" }}
        >
          <Card.Header> Personal Details </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {loadingData ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Form onSubmit={handlePersonalSubmit}>
                <Row>
                  <Col>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formEmail" className="mt-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPhone" className="mt-3">
                      <Form.Label>Phone:</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formAddress" className="mt-3">
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>

        <Card
          className="mx-auto"
          style={{ width: "60rem", marginBottom: "25px" }}
        >
          <Card.Header className="text-center mb-4">
            {" "}
            Career Information{" "}
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleCareerInfoSubmit}>
              <Form.Group as={Row} controlId="formEmploymentStatus" required>
                <Col sm="6">
                  <Form.Check
                    type="radio"
                    label="Employed"
                    name="employmentStatus"
                    onChange={() => handleEmploymentStatusChange("Yes")}
                    required
                  />
                </Col>
                <Col sm="6">
                  <Form.Check
                    type="radio"
                    label="Unemployed"
                    name="employmentStatus"
                    onChange={() => handleEmploymentStatusChange("No")}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group
                controlId="formSalaryExpectation"
                className="mt-3"
                required
              >
                <Form.Label>Salary Expectation</Form.Label>
                <Form.Control
                  as="select"
                  value={salaryExpectation}
                  onChange={(e) => setSalaryExpectation(e.target.value)}
                  required
                >
                  <option disabled value="">
                    Select Salary
                  </option>
                  {/* Updated salary ranges */}
                  {Array.from({ length: 13 }, (_, i) => 10000 + i * 15000).map(
                    (val) => (
                      <option key={val} value={val}>
                        €{val} - €{val + 15000}
                      </option>
                    )
                  )}
                  <option value="200000">€200,000 or more</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="formContractPreference"
                className="mt-3"
                required
              >
                <Form.Label>Contract Preference</Form.Label>
                <Form.Control
                  as="select"
                  value={contractPreference}
                  onChange={(e) => setContractPreference(e.target.value)}
                  required
                >
                  <option disabled value="">
                    Select Contract
                  </option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Fixed-Term">Fixed-Term</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="formWorksitePreference"
                className="mt-3"
                required
              >
                <Form.Label>Work-site Preference</Form.Label>
                <Form.Control
                  as="select"
                  value={worksitePreference}
                  onChange={(e) => setWorksitePreference(e.target.value)}
                  required
                >
                  <option disabled value="">
                    Select Work-site
                  </option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </Form.Control>
              </Form.Group>

              {skills.map((skillObj, index) => (
                <Form.Group
                  controlId={`formSkill${index}`}
                  className="mt-3"
                  key={index}
                  required
                >
                  <Form.Label>Skill {index + 1}</Form.Label>
                  <Select
                    value={
                      skillObj.selected
                        ? { label: skillObj.selected, value: skillObj.selected }
                        : null
                    }
                    options={csvSkills}
                    onChange={(newValue) => handleSkillChange(newValue, index)}
                    isSearchable
                    isClearable
                  />
                </Form.Group>
              ))}
              <Button variant="secondary" onClick={addSkillDropdown}>
                + Add another skill
              </Button>
              <div>
                {skills
                  .filter((skillObj) => skillObj.selected)
                  .map((skillObj, index) => (
                    <Badge
                      key={index}
                      pill
                      bg="primary"
                      className="mr-2 mb-2 mt-3"
                      onClick={() => removeSkill(skillObj.selected)}
                    >
                      {skillObj.selected} &times;
                    </Badge>
                  ))}
              </div>
              <Button className="w-15 mt-4" type="submit">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card
          className="mx-auto"
          style={{ width: "60rem", marginBottom: "25px" }}
        >
          <Card.Header>Work Experience</Card.Header>
          <Card.Body>
            {workExperiences.map((workExperience, index) => (
              <div key={index}>
                <Form
                  key={index}
                  onSubmit={(event) => handleExperienceSubmit(event, index)}
                >
                  <Row>
                    <Col>
                      <Form.Group controlId={`formJobTitle${index}`}>
                        <Form.Label>Job Title:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the Job Title"
                          value={workExperience.JobTitle}
                          onChange={(event) => {
                            const newWorkExperiences = [...workExperiences];
                            newWorkExperiences[index].JobTitle =
                              event.target.value;
                            setWorkExperiences(newWorkExperiences);
                          }}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId={`formIndustry${index}`}>
                        <Form.Label>Industry:</Form.Label>
                        <Form.Select
                          type="text"
                          placeholder="Enter the industry"
                          value={workExperience.industry}
                          onChange={(event) => {
                            const newWorkExperiences = [...workExperiences];
                            newWorkExperiences[index].industry =
                              event.target.value;
                            setWorkExperiences(newWorkExperiences);
                          }}
                          required
                        >
                          <option disabled value="">
                            Select Industry
                          </option>
                          <option value="Information and Communication Technology (ICT)">
                            Information and Communication Technology (ICT)
                          </option>
                          <option value="Pharmaceuticals">
                            Pharmaceuticals
                          </option>
                          <option value="Medical Devices">
                            Medical Devices
                          </option>
                          <option value="Financial Services">
                            Financial Services
                          </option>
                          <option value="Biotechnology">Biotechnology</option>
                          <option value="Food and Beverage">
                            Food and Beverage
                          </option>
                          <option value="Construction">Construction</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Tourism">Tourism</option>
                          <option value="Retail and Wholesale">
                            Retail and Wholesale
                          </option>
                          <option value="Energy and Natural Resources">
                            Energy and Natural Resources
                          </option>
                          <option value="Creative Industries (e.g. Advertising, Design, Media)">
                            Creative Industries (e.g. Advertising, Design,
                            Media)
                          </option>
                          <option value="Education and Training">
                            Education and Training
                          </option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Public Administration">
                            Public Administration
                          </option>
                          <option value="Agriculture and Forestry">
                            Agriculture and Forestry
                          </option>
                          <option value="Transport and Logistics">
                            Transport and Logistics
                          </option>
                          <option value="Environmental Services">
                            Environmental Services
                          </option>
                          <option value="Other">
                            Other
                          </option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group
                        controlId={`formCompanyName${index}`}
                        className="mt-3"
                      >
                        <Form.Label>Company Name:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the Company Name"
                          value={workExperience.CompanyName}
                          onChange={(event) => {
                            const newWorkExperiences = [...workExperiences];
                            newWorkExperiences[index].CompanyName =
                              event.target.value;
                            setWorkExperiences(newWorkExperiences);
                          }}
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        controlId={`formLocation${index}`}
                        className="mt-3"
                      >
                        <Form.Label>Company Location:</Form.Label>
                        <Form.Select
                          type="text"
                          placeholder="Enter the location"
                          value={workExperience.location}
                          onChange={(event) => {
                            const newWorkExperiences = [...workExperiences];
                            newWorkExperiences[index].location =
                              event.target.value;
                            setWorkExperiences(newWorkExperiences);
                          }}
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

                      <Form.Group
                        controlId={`formStartDate${index}`}
                        className="mt-3"
                      >
                        <Form.Label>Start Date:</Form.Label>
                        <Form.Control
                          type="date"
                          value={workExperience.startDate}
                          onChange={(event) => {
                            const newWorkExperiences = [...workExperiences];
                            newWorkExperiences[index].startDate =
                              event.target.value;
                            setWorkExperiences(newWorkExperiences);
                          }}
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        controlId={`formEndDate${index}`}
                        className="mt-3"
                      >
                        <Form.Label>End Date:</Form.Label>
                        <Form.Control
                          type="date"
                          disabled={workExperience.currentlyWorking}
                          value={workExperience.endDate}
                          onChange={(event) => {
                            const newWorkExperiences = [...workExperiences];
                            newWorkExperiences[index].endDate =
                              event.target.value;
                            setWorkExperiences(newWorkExperiences);
                          }}
                          required={!workExperience.currentlyWorking}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        controlId={`formCurrentlyWorking${index}`}
                        className="mt-3"
                      >
                        <Form.Check
                          type="checkbox"
                          label="I am currently working here"
                          checked={workExperience.currentlyWorking}
                          onChange={(event) => {
                            const newWorkExperiences = [...workExperiences];
                            newWorkExperiences[index].currentlyWorking =
                              event.target.checked;
                            setWorkExperiences(newWorkExperiences);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <br></br>
                  <Button className="mt-3" variant="primary" type="submit">
                    Save
                  </Button>
                  {workExperiences.length > 1 && (
                    <Button
                      variant="danger"
                      className="mt-3 ms-3"
                      onClick={() => removeWorkExperience(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Form>
                {index !== workExperiences.length - 1 && <hr />}
              </div>
            ))}

            <Button
              variant="secondary"
              className="mt-3"
              onClick={addWorkExperience}
            >
              + Add another work experience
            </Button>
          </Card.Body>
        </Card>

        <Card
          className="mx-auto"
          style={{ width: "60rem", marginBottom: "25px" }}
        >
          <Card.Header>Education</Card.Header>
          <Card.Body>
            {educations.map((education, index) => (
              <div key={index}>
                <Form
                  key={index}
                  onSubmit={(event) => handleEducationSubmit(event, index)}
                >
                  <Row>
                    <Col>
                      <Form.Group controlId={`formCourseTitle${index}`}>
                        <Form.Label>Course Title:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the Course Title"
                          value={education.CourseTitle}
                          onChange={(event) => {
                            const newEducations = [...educations];
                            newEducations[index].CourseTitle =
                              event.target.value;
                            setEducations(newEducations);
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId={`formQualification${index}`}>
                        <Form.Label>Qualification:</Form.Label>
                        <Form.Select
                          type="text"
                          placeholder="Enter the Qualification"
                          value={education.Qualification}
                          onChange={(event) => {
                            const newEducations = [...educations];
                            newEducations[index].Qualification =
                              event.target.value;
                            setEducations(newEducations);
                          }}
                          required
                        >
                          <option disabled value="">
                            Select Qualification
                          </option>
                          <option value="Junior Certificate">
                            Junior Certificate Level 3
                          </option>
                          <option value="Leaving Certificate">
                            Leaving Certificate Level 4/5
                          </option>
                          <option value="Certificate (Level 5)">
                            Certificate Level 5
                          </option>
                          <option value="Certificate (Level 6)">
                            Certificate Level 6
                          </option>
                          <option value="Higher Certificate">
                            Higher Certificate Level 6
                          </option>
                          <option value="Ordinary Bachelor Degree">
                            Ordinary Bachelor Degree Level 7
                          </option>
                          <option value="Honours Bachelor Degree">
                            Honours Bachelor Degree Level 8
                          </option>
                          <option value="Postgraduate Diploma">
                            Postgraduate Diploma Level 9
                          </option>
                          <option value="Master's Degree">
                            Master's Degree Level 9
                          </option>
                          <option value="Doctoral Degree">
                            Doctoral Degree Level 10
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        controlId={`formInstitution${index}`}
                        className="mt-3"
                      >
                        <Form.Label>Institution:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the Institution"
                          value={education.Institution}
                          onChange={(event) => {
                            const newEducations = [...educations];
                            newEducations[index].Institution =
                              event.target.value;
                            setEducations(newEducations);
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        controlId={`formCompletionDate${index}`}
                        className="mt-3"
                      >
                        <Form.Label>Completion Date:</Form.Label>
                        <Form.Control
                          type="date"
                          value={education.CompletionDate}
                          onChange={(event) => {
                            const newEducations = [...educations];
                            newEducations[index].CompletionDate =
                              event.target.value;
                            setEducations(newEducations);
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    Save
                  </Button>
                  {educations.length > 1 && (
                    <Button
                      variant="danger"
                      className="mt-3 ms-3"
                      onClick={() => removeEducation(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Form>
                {index !== educations.length - 1 && <hr />}
              </div>
            ))}
            <Button variant="success" className="mt-3" onClick={addEducation}>
              Add Education
            </Button>
          </Card.Body>
        </Card>
        <Card
          className="mx-auto"
          style={{ width: "40rem", marginBottom: "25px" }}
        >
          <Card.Header>Upload CV</Card.Header>
          <Card.Body>
            {fetchedCvUrl && (
              <div>
                <p>Current CV:</p>
                <a
                  href={fetchedCvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View CV
                </a>
              </div>
            )}
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
