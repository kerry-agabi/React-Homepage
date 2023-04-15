
import { Card, Container } from "react-bootstrap";
import styles from "./UserGuide.module.css"; // Import the CSS file

export default function UserGuide() {
  return (
    <Container className={styles.userGuideContainer}>
    <Card>
      <Card.Header className={styles.header}>
          A Complete User Guide to using the Employee Attrition Model Read Carefully
        </Card.Header>
        <Card.Body></Card.Body>
        <div className={styles.definition}>
          <h2>
          <strong>Attrition:</strong> <em>company losing its employee base</em>
          </h2> 
          <p>
            <strong>
              Attrition is a process in which the workforce dwindles at a
              company, following a period in which a number of people retire or
              resign, and are not replaced.
            </strong>
          </p>
        </div>

        <ul className={styles.list} >
          <li>
            <strong>Age:</strong> A period of employee life, measured by years
            from birth. e.g. 28
          </li>
          <br>
          </br>
          <li>
            <strong>DailyRate:</strong> Employee salary for the period is
            divided by the amount of calendar days in the period. e.g. 1229
          </li>
          <br>
          </br>
          <li>
            <strong>DistanceFromHome:</strong> How far the Employee live from
            the office location in Kilometers. e.g 5
          </li>
          <br>
          </br>
          <li>
            <strong>Education:</strong> In education 1 means 'Below College', 2
            means 'College', 3 means 'Bachelor', 4 means 'Master', 5 means
            'Doctor'.
          </li>
          <br>
          </br>
          <li>
            <strong>EnvironmentSatisfaction:</strong> 1 'Low' 2 'Medium' 3
            'High' 4 'Very High'
          </li>
          <br>
          </br>
          <li>
            <strong>Job involvement:</strong> Is the degree to which an employee
            identifies with their work and actively participates in it where 1
            means 'Low', 2 means 'Medium', 3 means 'High', 4 means 'Very High'.
          </li>
          <br>
          </br>
          <li>
            <strong>JobLevel:</strong> Job levels, also known as job grades and
            classifications, set the responsibility level and expectations of
            roles at your organization. They may be further defined by impact,
            seniority, knowledge, skills, or job title, and are often associated
            with a pay band. The way you structure your job levels should be
            dictated by the needs of your unique organization and teams. e.g. 3 
          </li>
          <br>
          </br>
          <li>
            <strong>JobSatisfaction:</strong> Employee job satisfaction rate
            where, 1 means 'Low', 2 means 'Medium', 3 means 'High', 4 means
            'Very High'.
          </li>
          <br>
          </br>
          <li>
            <strong>MonthlyIncome:</strong> total monetary value paid by the
            organization to an employee. e.g 3500
          </li>
          <li>
            <strong>MonthlyRate:</strong> The per-day wage of the employee. e.g. 10000
          </li>
          <br>
          </br>
          <li>
            <strong>NumCompaniesWorked:</strong> Before joining this
            organization how many organizations employee worked. e.g. 1
          </li>
          <br>
          </br>

          <li>
            <strong>PercentSalaryHike:</strong> e.g. 12
          </li>
          <br>
          </br>
          <li>
            <strong>Gender:</strong> e.g. 0 for male 1 for female
          </li>
          <br>
          </br>
          <li>
            <strong>PerformanceRating:</strong> 1 'Low' 2 'Good' 3 'Excellent' 4
            'Outstanding'.
          </li>
          <br>
          </br>
         
          <li>
            <strong>RelationshipSatisfaction:</strong> 1 'Low' 2 'Medium' 3
            'High' 4 'Very High'
          </li>
          <br>
          </br>
          <li>
            <strong>StandardHours:</strong> Is the number of hours of production
            time that should have been used during an working period.
          </li>
          <br>
          </br>
          <li>
            <strong>StockOptionLevel:</strong> Employee stock options, also
            known as ESOs, are stock options in the company’s stock granted by
            an employer to certain employees. Typically they are granted to
            those in management or officer-level positions. Stock options give
            the employee the right to buy a certain amount of stock at a
            specific price, during a specific period of time. Options typically
            have expiration dates as well, by which the options must have been
            exercised, otherwise they will become worthless. e.g. 0 or 1
          </li>
          <br>
          </br>
          <li>
            <strong>TotalWorkingYears:</strong> Total years the employee working
            in any organization e.g. 4
          </li>
          <br>
          </br>
          <li>
            <strong>TrainingTimesLastYear:</strong> Last year how many times
            employee took training session. e.g. 3 
          </li>
          <br>
          </br>
          <li>
            <strong>WorkLifeBalance:</strong> 1 'Bad' 2 'Good' 3 'Better' 4
            'Best'
          </li>
          <br>
          </br>
          <li>
            <strong>YearsAtCompany:</strong> How many years the employee working
            in the current organization e.g 4
          </li>
          <br>
          </br>
          <li>
            <strong>YearsInCurrentRole:</strong> How many years the employee
            working in the current position e.g. 2
          </li>
          <br>
          </br>
          <li>
            <strong>YearsSinceLastPromotion:</strong> How many years the
            employee working in the current position after promotion e.g. 1
          </li>
          <br>
          </br>
          <li>
            <strong>YearsWithCurrManager:</strong> How many years the employee
            working under the current manager e.g. 3
          </li>
          <br>
          </br>

          <li>
            <strong>BusinessTravel:</strong> Did the employee travel on a
            business trip or not. Value = 0 for Rarely, 1 for Frequently
          </li>
          <br>
          </br>
         
          <li>
            <strong>Department:</strong> In which department the Employee
            working. 1 for the particular department and 0 has to go in for the other departments
          </li>
          <br>
          </br>
      
          <li>
            <strong>EducationField:</strong> In which field Employee complete
            his education. 1 for the particular education and 0 has to in go for the other Education Fields
          </li>
          <br>
          </br>
          <li>
            <strong>EmployeeCount:</strong> How many employee working in a
            department.
          </li>
          <br>
          </br>
          <li>
            <strong>EmployeeNumber:</strong> An Employee Number is a unique
            number that has been assigned to each current and former State
            employee and elected official in the Position and Personnel DataBase
            (PPDB).
          </li>
          <br>
          </br>
         
          <li>
            <strong>JobRole:</strong> What is the jobrole of an employee. 1 for the particular job role and 0 has to go in for the other job role
          </li>
          <br>
          </br>
         
          <li>
            <strong>MaritalStatus:</strong> Marital status of the employee.  1 for the particular marital status and 0 has to go in for the other marital status
          </li>
          <br>
          </br>
         
          <li>
            <strong>OverTime:</strong> A Employee works more than 9 hours in any
            day or for more than 48 hours in any week. 0 for no 1 for yes
          </li>
          
        </ul>
      </Card>
    </Container>
  );
}
