import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { collection, getDocs, query, where, doc, getDoc  } from 'firebase/firestore';
import { db } from '../../firebase';
import './JobCard.css'

const calculateMatchingScore = (job, jobSeeker) => {
  let score = 0;
  let matchedCredentials = [];

  if (job && job.Skills) {
    const matchingSkills = job.Skills.filter((skill) => jobSeeker.skills && jobSeeker.skills.includes(skill));
    if (matchingSkills.length > 0) {
      score++;
      matchedCredentials.push(`Skills: ${matchingSkills.join(', ')}`);
    }
  }

  if (jobSeeker.address && job && job.Location) {
    const jobSeekerCounty = jobSeeker.address.split(',').map((part) => part.trim()).find((part) => part === job.Location);
    if (jobSeekerCounty) {
      score++;
      matchedCredentials.push(`Location: ${jobSeekerCounty}`);
    }
  }

  if (jobSeeker.contractPreference && job && job.Contract && jobSeeker.contractPreference === job.Contract) {
    score++;
    matchedCredentials.push(`Contract: ${jobSeeker.contractPreference}`);
  }

  if (jobSeeker.worksitePreference && job && job.WorkSite && jobSeeker.worksitePreference === job.WorkSite) {
    score++;
    matchedCredentials.push(`Worksite: ${jobSeeker.worksitePreference}`);
  }

  return { score, matchedCredentials };
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
      applicationsWithJobSeekers.sort((a, b) => b.matchingScore.score - a.matchingScore.score),
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
      <th>Matched Credentials</th>
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
        <td>{application.matchingScore.score}</td>
        <td>{application.matchingScore.matchedCredentials.join(', ')}</td>
      </tr>
    ))}
  </tbody>
</Table>

    </Container>
  );
}

export default View;
