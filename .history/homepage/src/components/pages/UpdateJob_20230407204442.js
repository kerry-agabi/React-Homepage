import React, { useState, useEffect } from "react";
import "firebase/compat/firestore";
import "../../File.css";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";

function UpdateJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobsCollectionRef = collection(db, "jobs");
  const jobDocRef = doc(db, "jobs", id);

  const [job, setJob] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedSkills = job.Skills.split(",").map((skill) => skill.trim());

    await updateDoc(jobDocRef, {
      Company: job.Company,
      Contract: job.Contract,
      JobDescription: job.JobDescription,
      JobTitle: job.JobTitle,
      Location: job.Location,
      Skills: updatedSkills,
      date: job.date,
      Link: job.Link,
      WorkSite: job.WorkSite,
    });

    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJob((prevState) => ({ ...prevState, [name]: value }));
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <Container>
        <Card>
          <Card.Header>Update Job Details</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {[
                { label: "Company Name", name: "Company" },
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
                  options: ["Carlow", "Cavan", "Clare"],
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
                      name={field.name}
                      placeholder={field.label}
                      value={job[field.name]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      name={field.name}
                      placeholder={field.label}
                      value={job[field.name]}
                      onChange={handleInputChange}
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
                />
              </Form.Group>
              <Button variant="primary" type="submit">
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