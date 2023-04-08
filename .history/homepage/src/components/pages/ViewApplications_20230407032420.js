import { useState, useEffect} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db} from '../../firebase'
import { useNavigate, Link } from "react-router-dom"; 
import { collection, getDocs } from 'firebase/firestore';
import { Card, Badge, Button, Collapse, Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';

function ViewApplications() {

const[jobs, setjobs] = useState([])
const [jobseekers, setJobseekers] = useState([]);
const jobseekersCollectionRef = collection(db, "Jobseekers");

useEffect(() => {
  const getJobseekers = async () => {
  const data = await getDocs(jobseekersCollectionRef);
  setJobseekers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  getJobseekers();
}, []);
  const jobsCollectionRef = collection(db, "jobs")
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const getjobs = async () => {
      const data = await getDocs(jobsCollectionRef);
      setjobs(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };
  
    getjobs();
  }, []);
  const toggleOpen = (id) => {
    setjobs((prevJobs) => prevJobs.map((job) => {
      if (job.id === id) {
        return {...job, open: !job.open};
      } else {
        return job;
      }
    }))
  }

  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.JobTitle.toLowerCase().includes(titleFilter.toLowerCase());
    const locationMatch = job.Location.toLowerCase().includes(locationFilter.toLowerCase());
    const skillsMatch = job.Skills.some((skill) =>
      skill.toLowerCase().includes(skillsFilter.toLowerCase())
    );

    return titleMatch && locationMatch && skillsMatch;
  });
    //Algorithm
  const calculateMatchingScore = (job, jobseeker) => {
    let score = 0;
  
    // Increase the score for each matching skill
    job.Skills.forEach((skill) => {
      if (jobseeker.skills && jobseeker.skills.includes(skill)) {
        score++;
      }
    });
  
    // Increase the score if the location matches
    if (jobseeker.address && jobseeker.address === job.Location) {
      score++;
    }
  
    // Increase the score if the contract type matches
    if (jobseeker.contractPreference && jobseeker.contractPreference === job.Contract) {
      score++;
    }
  
    // Increase the score if the worksite type matches
    if (jobseeker.worksitePreference && jobseeker.worksitePreference === job.WorkSite) {
      score++;
    }
  
    return score;
  };
//Filter
  const findMatchingJobseekers = (job) => {
    const matchedJobseekers = jobseekers
      .map((jobseeker) => {
        return {
          ...jobseeker,
          matchingScore: calculateMatchingScore(job, jobseeker),
        };
      })
      .filter((jobseeker) => jobseeker.matchingScore > 0)
      .sort((a, b) => b.matchingScore - a.matchingScore);
  
    return matchedJobseekers;
  };

  const [matchedJobseekers, setMatchedJobseekers] = useState([]);

const handleApplyNow = (jobId) => {
  const job = jobs.find((j) => j.id === jobId);
  const matchedJobseekers = findMatchingJobseekers(job);
  setMatchedJobseekers(matchedJobseekers);
  navigate(`/view2/${jobId}`);
};
  

 return (


  <div className='mt-4'>
    <Container>

    
 <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          placeholder="Filter by Job Title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="form-control mr-2"
          style={{ width: "32%" }}
        />
        <input
          type="text"
          placeholder="Filter by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="form-control mr-2"
          style={{ width: "32%" }}
        />
        <input
          type="text"
          placeholder="Filter by Skills"
          value={skillsFilter}
          onChange={(e) => setSkillsFilter(e.target.value)}
          className="form-control"
          style={{ width: "32%" }}
        />
      </div>
   
 
      {filteredJobs.map((job) => {

      return (
        <Card className="mb-3" key={job.id}>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <img
                  className="d-none d-md-block"
                  style={{
                    height: "70px",
                    float: "right",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    padding: "10px",
                  }}
                  alt={job.company}
                  src={job.ImageUrl}
                />
                <Card.Title>
                  {job.JobTitle} -{" "}
                  <span className="text-mute font-weight-light">
                    {job.Company}{" "}
                  </span>
                </Card.Title>
                <Card.Subtitle>
                  {new Date(job.date).toLocaleDateString()}
                </Card.Subtitle>
                <Badge bg="dark" className="mr-2 mt-2 ">
                  {job.Contract}
                </Badge>
                <Badge bg="dark" className="mb-2">
                  {job.Location}
                </Badge>

                <div style={{ wordBreak: "break-all" }}>
                  <a href={job.Link} target="_blank" rel="noopener noreferrer">
                    {job.Link}
                  </a>
                </div>
              </div>
            </div>
            <Card.Text>
              <br></br>
              <Button
                onClick={() => toggleOpen(job.id)}
                style={{ Bottom: "1px" }}
                variant="primary"
              >
                {job.open ? "Hide Details" : "View Details"}
              </Button>{" "}
              <Button
                to='/view2'
                onClick={() => handleApplyNow(job.id)}
                style={{ Bottom: "1px" }}
                variant="info"
              >
                Job Applications
              </Button>{" "}
            </Card.Text>

            {job.Skills.map((skill, index) => (
              <Badge key={index} bg="secondary" className="mb-2 mr-2">
                {skill}
              </Badge>
            ))}

            <Collapse in={job.open}>
              <div className="mt-4">
                <ReactMarkdown children={job.JobDescription} />
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      );
     })}

</Container>
</div> )



}

export default ViewApplications;