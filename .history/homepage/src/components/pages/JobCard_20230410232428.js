import { useState, useEffect, useContext} from 'react';
import  'firebase/compat/firestore';
import '../../File.css'
import {db} from '../../firebase'
import { useNavigate, Link } from "react-router-dom"; 
import { collection, getDocs } from 'firebase/firestore';
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';
import './JobCard.css';
import { AuthContext } from '../../AuthContext';
import { calculateMatchingScore } from './ViewApplications';

function JobCard() {
  const { currentUser } = useContext(AuthContext);

  const[jobs, setjobs] = useState([])
  const jobsCollectionRef = collection(db, "jobs")
  const navigate = useNavigate();
  const handleApplyNow = (jobId) => {
    navigate(`/jobapplication/${jobId}`);
  };
  

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
  const [workSiteFilter, setWorkSiteFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");
  const [contractFilter, setContractFilter] = useState("");

  const filteredJobs = jobs
  .filter((job) => {
    const titleMatch =
      job.JobTitle.toLowerCase().includes(titleFilter.toLowerCase()) ||
      job.Company.toLowerCase().includes(titleFilter.toLowerCase());
    const locationMatch = job.Location.toLowerCase().includes(locationFilter.toLowerCase());
    const workSiteMatch = job.WorkSite.toLowerCase().includes(workSiteFilter.toLowerCase());
    const skillsMatch = job.Skills.some((skill) =>
      skill.toLowerCase().includes(skillsFilter.toLowerCase())
    );
    const contractMatch = contractFilter === "" || job.Contract === contractFilter;

    return titleMatch && locationMatch && skillsMatch && workSiteMatch && contractMatch;
  })
  .sort((a, b) => {
    if (currentUser && currentUser.jobSeeker) {
      const aMatchingScore = calculateMatchingScore(a, currentUser.jobSeeker).score;
      const bMatchingScore = calculateMatchingScore(b, currentUser.jobSeeker).score;
      return bMatchingScore - aMatchingScore;
    }
    else{ (a, b) => new Date(b.date) - new Date(a.date)} // Sort jobs by date (most recent to least recent)
  })
  
  


  const clearFilters = () => {
    setTitleFilter("");
    setLocationFilter("");
    setSkillsFilter("");
    setWorkSiteFilter("");
    setContractFilter("");
  };

 return (
   <div className="mt-2">
    <div className="d-flex justify-content-center"> 
     <div className="d-flex flex-wrap justify-content-between mb-4 w-50">
     <div className="filter-container">
          <div className="filters mb-4 w-100">
         <input
           type="text"
           placeholder="Filter by Job Title or Company Name"
           value={titleFilter}
           onChange={(e) => setTitleFilter(e.target.value)}
           className="form-control mr-2"
           style={{ width: "95%" }}
         />

         <input
           type="text"
           placeholder="Filter by Skills"
           value={skillsFilter}
           onChange={(e) => setSkillsFilter(e.target.value)}
           className="form-control mt-2"
           style={{ width: "95%" }}
         />

         <select
           className="form-control mt-2"
           style={{ width: "95%" }}
           value={contractFilter}
           onChange={(e) => setContractFilter(e.target.value)}
         >
           <option value="">Filter by Contract</option>
           <option value="Full-Time">Full-Time</option>
           <option value="Part-Time">Part-Time</option>
           <option value="Fixed-Term">Fixed-Term</option>
         </select>
       </div>
       <div className="w-100">
         <select
           value={locationFilter}
           onChange={(e) => setLocationFilter(e.target.value)}
           className="form-control mr-2"
           style={{ width: "95%" }}
         >
           <option value="">Select Location</option>
           <option value="Carlow">Carlow</option>
           <option value="Cavan">Cavan</option>
           <option value="Clare">Clare</option>
           <option value="Cork">Cork</option>
           <option value="Donegal">Donegal</option>
           <option value="Dublin">Dublin</option>
           <option value="Galway">Galway</option>
           <option value="Kerry">Kerry</option>
           <option value="Kildare">Kildare</option>
           <option value="Kilkenny">Kilkenny</option>
           <option value="Laois">Laois</option>
           <option value="Leitrim">Leitrim</option>
           <option value="Limerick">Limerick</option>
           <option value="Longford">Longford</option>
           <option value="Louth">Louth</option>
           <option value="Mayo">Mayo</option>
           <option value="Meath">Meath</option>
           <option value="Monaghan">Monaghan</option>
           <option value="Offaly">Offaly</option>
           <option value="Roscommon">Roscommon</option>
           <option value="Sligo">Sligo</option>
           <option value="Tipperary">Tipperary</option>
           <option value="Waterford">Waterford</option>
           <option value="Westmeath">Westmeath</option>
           <option value="Wexford">Wexford</option>
           <option value="Wicklow">Wicklow</option>

           <option value="Antrim">Antrim</option>
           <option value="Armagh">Armagh</option>
           <option value="Derry">Derry</option>
           <option value="Down">Down</option>
           <option value="Fermanagh">Fermanagh</option>
           <option value="Tyrone">Tyrone</option>
         </select>
         <select
           className="form-control mt-2"
           style={{ width: "95%" }}
           value={workSiteFilter}
           onChange={(e) => setWorkSiteFilter(e.target.value)}
         >
           <option value="">Filter by Work-site</option>
           <option value="on-site">On-site</option>
           <option value="hybrid">Hybrid</option>
           <option value="remote">Remote</option>
         </select>
         <Button
    variant="secondary"
    className="mt-2 ml-0"
    style={{ width: "95%" }}
    onClick={clearFilters}
  >
    Clear Filters
  </Button>
</div>
</div>
<div>
  <h5 className='ml-10'>
    {filteredJobs.length > 0
      ? `Found ${filteredJobs.length} job listing${filteredJobs.length > 1 ? "s" : ""} available.`
      : "Sorry, we currently do not have a job listing that matches your specific requirement, come back again in the near future."}
  </h5>
       </div>
       </div>
     </div>
     <div className="card-container"> 
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
                 <Badge bg="dark" className="mr-2 mt-2 ">
                   {job.WorkSite}
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
                 className='mr-0 ml-0'
               >
                 {job.open ? "Hide Details" : "View Details"}
               </Button>{" "}
               <Button
                 onClick={() => handleApplyNow(job.id)}
                 style={{ Bottom: "1px" }}
                 variant="info"
                 className='mr-0 ml-0'
                 
               >
                 Apply Now
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
   </div>
   </div>
 );



}

export default JobCard;