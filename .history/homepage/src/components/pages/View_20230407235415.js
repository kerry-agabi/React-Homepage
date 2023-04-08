import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { collection, getDocs, query, where, doc, getDoc, docs } from 'firebase/firestore';
import { db } from '../../firebase';

const calculateMatchingScore = (job, jobSeeker) => {
  let score = 0;

  // Increase the score for each matching skill
  job.Skills.forEach((skill) => {
    if (jobSeeker.skills && jobSeeker.skills.includes(skill)) {
      score++;
    }
  });

  // Increase the score if the location matches
  if (jobSeeker.address && jobSeeker.address === job.Location) {
    score++;
  }

  // Increase the score if the contract type matches
  if (jobSeeker.contractPreference && jobSeeker.contractPreference === job.Contract) {
    score++;
  }

  // Increase the score if the worksite type matches
  if (jobSeeker.worksitePreference && jobSeeker.worksitePreference === job.WorkSite) {
    score++;
  }

  return score;
};
function View() {
  const { jobId } = useParams(); // Add this line to get the jobId from the URL
  const [job, setJob] = useState({});

  useEffect(() => {
    const getJob = async () => {
      const jobSnapshot = await getDoc(doc(db, 'jobs', jobId));
      setJob(jobSnapshot.data());
    };
  
    getJob();
  }, [jobId]);
  const [applications, setApplications] = useState([]);

  const getApplications = async () => {
    const applicationsRef = collection(db, 'applications');
    const q = query(applicationsRef, where('jobId', '==', jobId));
  
    const applicationsSnapshot = await getDocs(q);
  
    const applicationsWithJobSeekers = await Promise.all(
      applicationsSnapshot.docs.map(async (doc) => {
        const application = doc.data();
        const jobSeekerSnapshot = await getDoc(docs(db, "jobSeekers", application.userId));
        const jobSeeker = jobSeekerSnapshot.data();
        const matchingScore = calculateMatchingScore(job, jobSeeker);
  
        return {
          ...application,
          jobSeeker,
          matchingScore,
          id: doc.id,
        };
      }),
    );
  
    setApplications(
      applicationsWithJobSeekers.sort((a, b) => b.matchingScore - a.matchingScore),
    );
  };
  
  useEffect(() => {
    getApplications();
  }, [jobId]);
  return (
    <Container>
      <h2 className="mt-4 mb-4">Job Applications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>CV</th>
            <th>Cover Note</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.firstName}</td>
              <td>{application.lastName}</td>
              <td>{application.email}</td>
              <td>
                <a href={application.cvFileURL} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </td>
              <td>{application.coverNote}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default View;
