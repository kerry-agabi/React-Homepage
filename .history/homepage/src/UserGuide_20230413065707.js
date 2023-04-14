import React from "react";
import { Card, Container, Button } from "react-bootstrap";

export default function UserGuide() {
  return (
    <Container>
      <Card>
        <Card.Header>
          {" "}
          A Complete User Guide to using the Employee Attrition Model{" "}
        </Card.Header>
        <Card.Body></Card.Body>
        <div className="text-align: center;">
          <h2>
            Attrition: <em>company losing its employee base</em>
          </h2>
          <p>
            <strong>
              Attrition is a process in which the workforce dwindles at a
              company, following a period in which a number of people retire or
              resign, and are not replaced.
            </strong>
          </p>
        </div>

        <ul>
          <li>
            <strong>Age:</strong> A period of employee life, measured by years
            from birth.
          </li>
          <li>
            <strong>BusinessTravel:</strong> Did the employee travel on a
            business trip or not. Value = 0 for Rarely, 1 for Frequently
          </li>
          <li>
            <strong>DailyRate:</strong> Employee salary for the period is
            divided by the amount of calendar days in the period. Value = e.g. 1229
          </li>
          <li>
            <strong>Department:</strong> In which department the Employee
            working.
          </li>
          <li>
            <strong>DistanceFromHome:</strong> How far the Employee live from
            the office location.
          </li>
          <li>
            <strong>Education:</strong> In education 1 means 'Below College', 2
            means 'College', 3 means 'Bachelor', 4 means 'Master', 5 means
            'Doctor'.
          </li>
          <li>
            <strong>EducationField:</strong> In which field Employee complete
            his education.
          </li>
          <li>
            <strong>EmployeeCount:</strong> How many employee working in a
            department.
          </li>
          <li>
            <strong>EmployeeNumber:</strong> An Employee Number is a unique
            number that has been assigned to each current and former State
            employee and elected official in the Position and Personnel DataBase
            (PPDB).
          </li>
          <li>
            <strong>Job involvement:</strong> Is the degree to which an employee
            identifies with their work and actively participates in it where 1
            means 'Low', 2 means 'Medium', 3 means 'High', 4 means 'Very High'.
          </li>
          <li>
            <strong>JobLevel:</strong> Job levels, also known as job grades and
            classifications, set the responsibility level and expectations of
            roles at your organization. They may be further defined by impact,
            seniority, knowledge, skills, or job title, and are often associated
            with a pay band. The way you structure your job levels should be
            dictated by the needs of your unique organization and teams.
          </li>
          <li>
            <strong>JobRole:</strong> What is the jobrole of an employee.
          </li>
          <li>
            <strong>JobSatisfaction:</strong> Employee job satisfaction rate
            where, 1 means 'Low', 2 means 'Medium', 3 means 'High', 4 means
            'Very High'.
          </li>
          <li>
            <strong>MaritalStatus:</strong> Marital status of the employee.
          </li>
          <li>
            <strong>MonthlyIncome:</strong> total monetary value paid by the
            organization to an employee.
          </li>
          <li>
            <strong>MonthlyRate:</strong> The per-day wage of the employee.
          </li>
          <li>
            <strong>NumCompaniesWorked:</strong> Before joining this
            organization how many organizations employee worked.
          </li>
          <li>
            <strong>Over18:</strong> Is the employee age over than 18 or not.
          </li>
          <li>
            <strong>OverTime:</strong> A Employee works more than 9 hours in any
            day or for more than 48 hours in any week.
          </li>
          <li>
            <strong>PercentSalaryHike:</strong>
          </li>
          <li>
            <strong>PerformanceRating:</strong> 1 'Low' 2 'Good' 3 'Excellent' 4
            'Outstanding'.
          </li>
          <li>
            <strong>EnvironmentSatisfaction:</strong> 1 'Low' 2 'Medium' 3
            'High' 4 'Very High'
          </li>
          <li>
            <strong>RelationshipSatisfaction:</strong> 1 'Low' 2 'Medium' 3
            'High' 4 'Very High'
          </li>
          <li>
            <strong>StandardHours:</strong> Is the number of hours of production
            time that should have been used during an working period.
          </li>
          <li>
            <strong>StockOptionLevel:</strong> Employee stock options, also
            known as ESOs, are stock options in the company’s stock granted by
            an employer to certain employees. Typically they are granted to
            those in management or officer-level positions. Stock options give
            the employee the right to buy a certain amount of stock at a
            specific price, during a specific period of time. Options typically
            have expiration dates as well, by which the options must have been
            exercised, otherwise they will become worthless.
          </li>
          <li>
            <strong>TotalWorkingYears:</strong> Total years the employee working
            in any organization
          </li>
          <li>
            <strong>TrainingTimesLastYear:</strong> Last year how many times
            employee took training session.
          </li>
          <li>
            <strong>WorkLifeBalance:</strong> 1 'Bad' 2 'Good' 3 'Better' 4
            'Best'
          </li>
          <li>
            <strong>YearsAtCompany:</strong> How many years the employee working
            in the current organization
          </li>
          <li>
            <strong>YearsInCurrentRole:</strong> How many years the employee
            working in the current position
          </li>
          <li>
            <strong>YearsSinceLastPromotion:</strong> How many years the
            employee working in the current position after promotion
          </li>
          <li>
            <strong>YearsWithCurrManager:</strong> How many years the employee
            working under the current manager
          </li>
        </ul>
      </Card>
    </Container>
  );
}
