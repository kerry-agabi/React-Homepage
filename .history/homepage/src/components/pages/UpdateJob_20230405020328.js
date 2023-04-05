import React, { useState, useEffect } from 'react';
import 'firebase/compat/firestore';
import '../../File.css';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Card, Form, Button } from 'react-bootstrap';

function UpdateJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobsCollectionRef = collection(db, 'jobs');
  const jobDocRef = doc(db, 'jobs', id);

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

    const updatedSkills = job.Skills.split(',').map((skill) => skill.trim());

    await updateDoc(jobDocRef, {
      Company: job.Company,
      Contract: job.Contract,
      JobDescription: job.JobDescription,
      JobTitle: job.JobTitle,
      Location: job.Location,
      Skills: updatedSkills,
      date: job.date,
      Link: job.Link,
    });

    navigate('/');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJob((prevState) => ({ ...prevState, [name]: value }));
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <Card>
        <Card.Header>Update Job Details</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {[
              { label: "Company Name", name: "Company" },
              { label: "Contract", name: "Contract" },
              { label: "Job Title", name: "JobTitle" },
              { label: "Location", name: "Location" },
              { label: "Skills", name: "Skills" },
              { label: "Job Application Link", name: "Link" },
            ].map((field) => (
              <Form.Group
                controlId={`${field.name}-for-my-form`}
                key={field.name}
              >
                <Form.Label>{field.label}</Form.Label>
                {field.name === "Skills" ? (
                  <Form.Control
                    type="text"
                    name={field.name}
                    value={
                      Array.isArray(job[field.name])
                        ? job[field.name].join(", ")
                        : job[field.name]
                    }
                    onChange={handleInputChange}
                    placeholder="Enter skills separated by commas (e.g. JavaScript, React)"
                  />
                ) : (
                  <Form.Control
                    type="text"
                    name={field.name}
                    value={job[field.name]}
                    onChange={handleInputChange}
                  />
                )}
              </Form.Group>
            ))}
            <Form.Group controlId="description-for-my-from">
              <Form.Label>Job description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="JobDescription"
                value={job.JobDescription}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="my-date-input">
              <Form.Label>Enter a date:</Form.Label>
              <Form.Control
                type="date"
                id="my-date-input"
                name="date"
                value={job.date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Job
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
                }
                
                export default UpdateJob;
