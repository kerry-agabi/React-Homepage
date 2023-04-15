import React, { useState, useEffect } from "react";
import "firebase/compat/firestore";
import "../../File.css";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Card, Form, Button, Container } from "react-bootstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import './UpdateJob.css';

function UpdateJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobsCollectionRef = collection(db, "jobs");
  const jobDocRef = doc(db, "jobs", id);
  const [newImageUrl, setNewImageUrl] = useState('');
  const storage = getStorage();
  const [file, setFile] = useState(null);

  const [job, setJob] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  useEffect(() => {
    const fetchJob = async () => {
      const jobSnapshot = await getDocs(jobsCollectionRef);
      const jobData = jobSnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find((job) => job.id === id);
      setJob(jobData);
    };

    fetchJob();
  }, [id]);

  const [skillsInput, setSkillsInput] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      const jobSnapshot = await getDocs(jobsCollectionRef);
      const jobData = jobSnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find((job) => job.id === id);
      setJob(jobData);
      if (jobData.Skills) {
        setSkillsInput(jobData.Skills.join(', '));
      }
    };
  
    fetchJob();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'Skills') {
      setSkillsInput(value);
    } else if (name === 'NewImageUrl') {
      setNewImageUrl(value);
    } else {
      setJob((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedSkills = skillsInput
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

      let imageUrl = job.ImageUrl;
    if (file) {
      const fileRef = ref(storage, `logos/${file.name}`);
      await uploadBytes(fileRef, file);
      imageUrl = await getDownloadURL(fileRef);
    }

    await updateDoc(jobDocRef, {
      Company: job.Company,
      Contract: job.Contract,
      JobDescription: job.JobDescription,
      JobTitle: job.JobTitle,
      Location: job.Location,
      Skills: updatedSkills,
      date: job.date,
      Link: job.Link,
      ImageUrl: imageUrl,
      WorkSite: job.WorkSite,
    });

    navigate("/");
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="UpdateJob">
      <Container>
        <Card className="UpdateJob-card">
          <Card.Header className="UpdateJob-card-header">
            Update Job Details
          </Card.Header>
          <Card.Body className="UpdateJob-card-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="current-company-logo">
                <img
                  src={job.ImageUrl}
                  alt="Current company logo"
                  style={{ height: "100px", objectFit: "cover" }}
                />
              </Form.Group>
              <Form.Group controlId="file-upload-for-my-form">
                <Form.Label>Company Logo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Form.Group>
              {[
                { label: "Company Name", name: "Company" },
                { label: "Company Logo", name: "ImageUrl" },
                {
                  label: "Contract",
                  name: "Contract",
                  isSelect: true,
                  options: ["Full-Time", "Part-Time", "Fixed-Term"],
                },
                { label: "Job Title", name: "JobTitle" },
                {
                  label: "Location",
                  name: "Location",
                  isSelect: true,
                  options: [
                    "Carlow",
                    "Cavan",
                    "Clare",
                    "Cork",
                    "Donegal",
                    "Dublin",
                    "Galway",
                    "Kerry",
                    "Kildare",
                    "Kilkenny",
                    "Laois",
                    "Leitrim",
                    "Limerick",
                    "Longford",
                    "Louth",
                    "Mayo",
                    "Meath",
                    "Monaghan",
                    "Offaly",
                    "Roscommon",
                    "Sligo",
                    "Tipperary",
                    "Waterford",
                    "Westmeath",
                    "Wexford",
                    "Wicklow",
                    "Antrim",
                    "Armagh",
                    "Derry",
                    "Down",
                    "Fermanagh",
                    "Tyrone",
                    "--------------------",
                    "Work from home",
                    "Worldwide",
                    "Africa",
                    "North America",
                    "Middle East",
                    "Asia",
                    "Europe",
                    "Australia",
                    "Caribbean",
                    "Central America",
                    "International",
                  ],
                },
                { label: "Skills", name: "Skills" },
                { label: "Job Application Link", name: "Link" },
                {
                  label: "Work-site",
                  name: "WorkSite",
                  isSelect: true,
                  options: ["On-site", "Hybrid", "Remote"],
                },
              ].map((field) => (
                <Form.Group
                  controlId={`${field.name}-for-my-form`}
                  key={field.name}
                >
                  <Form.Label>{field.label}</Form.Label>
                  {field.isSelect ? (
                    <Form.Select
                      name={field.name}
                      value={job[field.name]}
                      onChange={handleInputChange}
                      required
                    >
                      <option disabled value="">
                        Select {field.label}
                      </option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  ) : field.name === "Skills" ? (
                    <Form.Control
                      type="text"
                      name="Skills"
                      placeholder={field.label}
                      value={
                        skillsInput || (job.Skills && job.Skills.join(", "))
                      }
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      name={field.name}
                      placeholder={field.label}
                      value={job[field.name]}
                      onChange={handleInputChange}
                      required
                    />
                  )}
                </Form.Group>
              ))}
              <Form.Group controlId="description-for-my-form">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="JobDescription"
                  placeholder="Job Description"
                  value={job.JobDescription}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="date-for-my-form">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  placeholder="YYYY-MM-DD"
                  value={job.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="UpdateJob-button"
              >
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container> 
    </div>
  );
}

export default UpdateJob;

