import React, { useState } from "react";
import { rtdb, storage } from "../../firebase";
import { Card, Form, Button, Row, Col, Container, Alert, Badge } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../AuthContext";

function DashboardSeeker() {

    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
    const [isEmployed, setIsEmployed] = useState(false);
    const [salaryExpectation, setSalaryExpectation] = useState("");
    const [contractPreference, setContractPreference] = useState("");
    const [worksitePreference, setWorksitePreference] = useState("");
    const [skills, setSkills] = useState([]);

    const [workExperiences, setWorkExperiences] = useState([{ JobTitle: "", industry: "", CompanyName: "", location: "" }]);
    const addWorkExperience = () => {
      setWorkExperiences([...workExperiences, { JobTitle: "", industry: "", CompanyName: "", location: "" }]);
    };
    const removeWorkExperience = (index) => {
      setWorkExperiences(workExperiences.filter((_, i) => i !== index));
    };
  const [educations, setEducations] = useState([{ CourseTitle: "", Qualification: "", Institution: "", CompletionDate: "" }]);

  // Add education form
  const addEducation = () => {
    setEducations([...educations, { CourseTitle: "", Qualification: "", Institution: "", CompletionDate: "" }]);
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
  const handleEducationSubmit = (event, index) => {
    event.preventDefault();
    const jobSeekerRef = rtdb.child(`jobSeekers/${currentUser.uid}/educations`);
    jobSeekerRef.child(index).update(educations[index]);
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
    
  const [employed, setEmployed] = useState(false);
  const [unemployed, setUnemployed] = useState(false);
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

const handleExperienceSubmit = (event, index) => {
  event.preventDefault();
  const jobSeekerRef = rtdb.child(`jobSeekers/${currentUser.uid}/workExperiences`);
  jobSeekerRef.child(index).update(workExperiences[index]);
    // Call the function to reset the fields after updating the data
    resetWorkExperienceFields(index);
  
};

const handleCareerInfoSubmit = (event) => {
  event.preventDefault();

  const jobSeekerRef = rtdb.child(`jobSeekers/${currentUser.uid}/careerInfo`);
  jobSeekerRef.update({
    isEmployed,
    salaryExpectation,
    contractPreference,
    worksitePreference,
    skills,
  });
};

const handleEmployedChange = (e) => {
  setEmployed(e.target.checked);
  if (e.target.checked) {
    setUnemployed(false);
  }
};

const handleUnemployedChange = (e) => {
  setUnemployed(e.target.checked);
  if (e.target.checked) {
    setEmployed(false);
  }
};

const handleEmploymentStatusChange = (status) => {
  setIsEmployed(status);
};





const handleSkillChange = (e) => {
  const selectedOptions = Array.from(e.target.selectedOptions);
  const newSkills = selectedOptions.map((option) => option.value);
  setSkills(newSkills);
};

const removeSkill = (skillToRemove) => {
  setSkills(skills.filter((skill) => skill !== skillToRemove));
};

//start
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
                    <Form.Label>First Name:</Form.Label>
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
                    <Form.Label>Last Name:</Form.Label>
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
                    <Form.Label>Email:</Form.Label>
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
                    <Form.Label>Phone:</Form.Label>
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
                <Form.Label>Address or Eircode:</Form.Label>
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

        <Card className="mx-auto" style={{ width: "40rem", marginBottom: "25px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Career Information</h2>
          <Form onSubmit={handleCareerInfoSubmit}>
            <Form.Group as={Row} controlId="formEmploymentStatus">
              <Col sm="6">
                <Form.Check
                  type="radio"
                  label="Employed"
                  name="employmentStatus"
                  onChange={() => handleEmploymentStatusChange("Yes")}
                />
              </Col>
              <Col sm="6">
                <Form.Check
                  type="radio"
                  label="Unemployed"
                  name="employmentStatus"
                  onChange={() => handleEmploymentStatusChange("No")}
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="formSalaryExpectation" className = 'mt-3'>
              <Form.Label>Salary Expectation</Form.Label>
              <Form.Control
                as="select"
                value={salaryExpectation}
                onChange={(e) => setSalaryExpectation(e.target.value)}
              >
                <option disabled value="">Select Salary</option>
                {/* Updated salary ranges */}
                {Array.from({ length: 13 }, (_, i) => 10000 + i * 15000).map((val) => (
                  <option key={val} value={val}>
                    €{val} - €{val + 15000}
                  </option>
                ))}
                <option value="200000">€200,000 or more</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formContractPreference" className = 'mt-3'>
              <Form.Label>Contract Preference</Form.Label>
              <Form.Control
                as="select"
                value={contractPreference}
                onChange={(e) => setContractPreference(e.target.value)}
              >
                <option disabled value="">Select Contract</option>
                <option value="Part-time">Part-time</option>
                <option value="Full-time">Full-time</option>
                <option value="Fixed-Term">Fixed-Term</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formWorksitePreference" className = 'mt-3' >
              <Form.Label>Work-site Preference</Form.Label>
              <Form.Control
                as="select"
                value={worksitePreference}
                onChange={(e) => setWorksitePreference(e.target.value)}
              >
                <option disabled value="">Select Work-site</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSkill" className = 'mt-3' >
              <Form.Label>Skills</Form.Label>
              <Form.Control
                as="select"
                value={skills}
                onChange={handleSkillChange}
              >
                <option disabled value="">Select Skill 1 </option>
                <option value="Java">Java</option>
                <option value="Ruby">Ruby</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="React">React</option>
                <option value="SQL">SQL</option>
                <option value="PHP">PHP</option>
                <option value="C#">C#</option>
                <option value="C++">C++</option>
              </Form.Control>
            </Form.Group>
            <div>
        {skills.map((skill, index) => (
          <Badge
            key={index}
            pill
            bg="primary"
            className="mr-2 mb-2 mt-3"
            onClick={() => removeSkill(skill)}
          >
            {skill} &times;
          </Badge>
        ))}
      </div>
                <Button className="w-100 mt-4" type="submit">
                Save
                </Button>
                </Form>
                </Card.Body>
                </Card>

        <Card
          className="mx-auto"
          style={{ width: "40rem", marginBottom: "25px" }}
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
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId={`formQualification${index}`}>
                        <Form.Label>Qualification:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the Qualification"
                          value={education.Qualification}
                          onChange={(event) => {
                            const newEducations = [...educations];
                            newEducations[index].Qualification =
                              event.target.value;
                            setEducations(newEducations);
                          }}
                        />
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
