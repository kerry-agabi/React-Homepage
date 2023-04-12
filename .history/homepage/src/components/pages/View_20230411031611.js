import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { collection, getDocs, query, where, doc, getDoc  } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { Card, CardGroup, Row, Col, Image } from 'react-bootstrap';
import { getDownloadURL, ref } from 'firebase/storage';


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
  
    const defaultAvatarRef = ref(storage, 'Avatar/avatar.png');
    const defaultAvatarURL = await getDownloadURL(defaultAvatarRef);
  
    const applicationsWithJobSeekers = await Promise.all(
      applicationsSnapshot.docs.map(async (applicationDoc) => {
        const application = applicationDoc.data();
        const jobSeekerSnapshot = await getDoc(doc(db, 'jobSeekers', application.userId));
        const jobSeeker = jobSeekerSnapshot.data();
        const matchingScore = calculateMatchingScore(job, jobSeeker);
        const profilePhoto = jobSeeker.profilePhoto ? jobSeeker.profilePhoto : defaultAvatarURL;
  
        return {
          ...application,
          jobSeeker: { ...jobSeeker, profilePhoto },
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
    <Container className='justify-content-center mr-1'>
    <h2 className="mt-4 mb-4">Job Applications</h2>
    <Row className="d-flex justify-content-center">
      {applications.map((application) => (
        <Col xs={12} md={6} lg={4} className="mb-4" key={application.id}>
          <Card>
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <Image
                    src={application.jobSeeker.profilePhoto}
                    alt={`${application.firstName} ${application.lastName}`}
                    roundedCircle
                    fluid
                    style={{ height: '100px', objectFit: 'cover' }}
                  />
                </div>
                <Card.Title className="mt-3">
                  <strong>Name:</strong> {application.firstName} {application.lastName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <strong>Email:</strong> {application.email}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Cover Note:</strong> {application.coverNote}
                </Card.Text>
                <Card.Link href={application.cvFileURL} target="_blank" rel="noopener noreferrer">
                  <strong>CV:</strong> Download CV
                </Card.Link>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <strong>Matching Score:</strong> {application.matchingScore.score}
                </small>
                <br />
                <small className="text-muted">
                  <strong>Matched Credentials:</strong> {application.matchingScore.matchedCredentials.join(', ')}
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
