import { useState, useEffect} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db} from '../../firebase'
import { collection, getDocs } from 'firebase/firestore';
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';

function JobCard() {

  const[jobs, setjobs] = useState([])
  const jobsCollectionRef = collection(db, "jobs")
  


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

 return (


  <div className='mt-4'>

   
 
  {jobs.map((job) => {

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
                <Badge bg="secondary" className="mr-2 mt-2 ">
                  {job.Contract}
                </Badge>
                <Badge bg="secondary" className="mb-2">
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
            </Card.Text>
            <Collapse in={job.open}>
              <div className="mt-4">
                <ReactMarkdown children={job.JobDescription} />
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      );
     })}


</div> )



}

export default JobCard;