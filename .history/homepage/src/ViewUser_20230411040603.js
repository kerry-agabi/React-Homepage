import React, { useState, useEffect } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { db } from "./firebase";
import { useAuth } from "./AuthContext";
import { getDocs, collection, query, where } from "firebase/firestore";

function ViewUser() {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState({});

  useEffect(() => {
    const fetchApplications = async () => {
      const applicationsRef = collection(db, "applications");
      const userApplicationsQuery = query(
        applicationsRef,
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(userApplicationsQuery);

      const applicationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setApplications(applicationsData);
    };

    fetchApplications();
  }, [currentUser.uid]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsRef = collection(db, "jobs");
      const querySnapshot = await getDocs(jobsRef);

      const jobsData = {};
      querySnapshot.docs.forEach((doc) => {
        jobsData[doc.id] = doc.data();
      });

      setJobs(jobsData);
    };

    fetchJobs();
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Your Job Applications</h2>
      <Col xs={12}>
        {applications.map((application) => {
          const job = jobs[application.jobId];

          return (
            job && (
              <Card
                key={application.id}
                className="mb-4 shadow rounded border-0 text-dark bg-light"
              >
                <Card.Header className="fw-bold">
                  {job.JobTitle} at {job.Company}
                </Card.Header>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={job.ImageUrl}
                    alt={`${job.Company} logo`}
                    className="float-end w-100"
                  />
                  <Card.Text className="fw-bold">Email:</Card.Text>
                  <Card.Text>{application.email}</Card.Text>
                  <Card.Text className="fw-bold">Name:</Card.Text>
                  <Card.Text>
                    {application.firstName} {application.lastName}
                  </Card.Text>
                  <Card.Text className="fw-bold">Cover Note:</Card.Text>
                  <Card.Text>{application.coverNote}</Card.Text>
                  <Card.Text className="fw-bold">CV File:</Card.Text>
                  <Card.Text>
                    <a href={application.cvFileURL}>Download CV</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          );
        })}
      </Col>
    </Container>
  );
}

export default ViewUser;
