import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { collection, getDocs, query, where, doc, getDoc  } from 'firebase/firestore';
import { db } from '../../firebase';
import { Card, CardGroup, Row, Col } from 'react-bootstrap';


export const calculateMatchingScore = (job, jobSeeker) => {
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
      <Row>
        {applications.map((application) => (
          <Col md={6} lg={4} className="mb-4" key={application.id}>
            <Card>
              <Card.Img
                variant="top"
                src={application.jobSeeker.profilePhoto}
                alt={`${application.firstName} ${application.lastName}`}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>
                  {application.firstName} {application.lastName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {application.email}
                </Card.Subtitle>
                <Card.Text>{application.coverNote}</Card.Text>
                <Card.Link href={application.cvFileURL} target="_blank" rel="noopener noreferrer">
                  Download CV
                </Card.Link>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Matching Score: {application.matchingScore.score}
                </small>
                <br />
                <small className="text-muted">
                  Matched Credentials: {application.matchingScore.matchedCredentials.join(', ')}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
  
}

export default View;
