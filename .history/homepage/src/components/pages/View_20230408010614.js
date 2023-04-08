import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { collection, getDocs, query, where, doc, getDoc  } from 'firebase/firestore';
import { db } from '../../firebase';

const calculateMatchingScore = (job, jobSeeker) => {
  let score = 0;

  // Check if job and job.Skills exist before trying to use them
  if (job && job.Skills) {
    // Increase the score by 1 if there's at least one matching skill
    const hasMatchingSkill = job.Skills.some((skill) => jobSeeker.skills && jobSeeker.skills.includes(skill));
    if (hasMatchingSkill) {
      score++;
    }
  }

  // Increase the score if the location matches
  if (jobSeeker.address && job && job.Location) {
    // Extract the county from the job seeker's address
    const jobSeekerCounty = jobSeeker.address.split(',').map((part) => part.trim()).find((part) => part === job.Location);
    if (jobSeekerCounty) {
      score++;
    }
  }

  // Increase the score if the contract type matches
  if (jobSeeker.contractPreference && job && job.Contract && jobSeeker.contractPreference === job.Contract) {
    score++;
  }

  // Increase the score if the worksite type matches
  if (jobSeeker.worksitePreference && job && job.WorkSite && jobSeeker.worksitePreference === job.WorkSite) {
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

  useEffect(() => {
    if (Object.keys(job).length > 0) {
      getApplications();
    }
  }, [job]);
  const [applications, setApplications] = useState([]);

  const getApplications = async () => {
    const applicationsRef = collection(db, 'applications');
    const q = query(applicationsRef, where('jobId', '==', jobId));
  
    const applicationsSnapshot = await getDocs(q);
  
    const applicationsWithJobSeekers = await Promise.all(
      applicationsSnapshot.docs.map(async (applicationDoc) => {
        const application = applicationDoc.data();
        const jobSeekerSnapshot = await getDoc(doc(db, "jobSeekers", application.userId));
        const jobSeeker = jobSeekerSnapshot.data();
        const matchingScore = calculateMatchingScore(job, jobSeeker);
  
        return {
          ...application,
          jobSeeker,
          matchingScore,
          id: applicationDoc.id,
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
            <th>Matching Score</th>
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
              <td>{application.matchingScore}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default View;
