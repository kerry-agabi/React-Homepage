import React from 'react'
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
            A reduction in staff due to attrition is often called a hiring
            freeze and is seen as a less disruptive way to trim the workforce
            and reduce payroll than layoffs
          </li>
          <li>
            In this NoteBook our Aim will be to analyze the datasets completely
            with each and feature and find the reason behind Attrition of
            Employees.
          </li>
          <li>And what the top factors which lead to employee attrition?</li>
        </ul>
        <ul>
          <li>Age: A period of employee life, measured by years from birth.</li>
          <li>Attrition: The departure of employees from the organization.</li>
          <li>
            BusinessTravel: Did the employee travel on a business trip or not.
          </li>
          <li>
            DailyRate: Employee salary for the period is divided by the amount
            of calendar days in the period.
          </li>
          <li>Department: In which department the Employee working.</li>
          <li>
            DistanceFromHome: How far the Employee live from the office
            location.
          </li>
          <li>
            Education: In education 1 means 'Below College', 2 means 'College',
            3 means 'Bachelor', 4 means 'Master', 5 means 'Doctor'
          </li>
          <li>
            EducationField: In which field Employee complete his education.
          </li>
          <li>EmployeeCount: How many employee working in a department.</li>
          <li>
            EmployeeNumber: An Employee Number is a unique number that has been
            assigned to each current and former State employee and elected
            official in the Position and Personnel DataBase (PPDB).
          </li>
          <li>
            Job involvement: Is the degree to which an employee identifies with
            their work and actively participates in it where 1 means 'Low', 2
            means 'Medium', 3 means 'High', 4 means 'Very High'
          </li>
          <li>
            JobLevel: Job levels, also known as job grades and classifications,
            set the responsibility level and expectations of roles at your
            organization. They may be further defined by impact, seniority,
            knowledge, skills, or job title, and are often associated with a pay
            band. The way you structure your job levels should be dictated by
            the needs of your unique organization and teams.
          </li>
          <li>JobRole: What is the jobrole of an employee.</li>
          <li>
            JobSatisfaction: Employee job satisfaction rate where, 1 means
            'Low', 2 means 'Medium', 3 means 'High', 4 means 'Very High'
          </li>
          <li>MaritalStatus: Marital status of the employee.</li>
          <li>
            MonthlyIncome: total monetary value paid by the organization to an
            employee.
          </li>
          <li>MonthlyRate: The per-day wage of the employee.</li>
          <li>
            NumCompaniesWorked: Before joining this organization how many
            organizations employee worked.
          </li>
          <li>Over18: Is the employee age over than 18 or not.</li>
          <li>
            OverTime: A Employee works more than 9 hours in any day or for more
            than 48 hours in any week.
          </li>
          <li>PercentSalaryHike:</li>
          <li>
            PerformanceRating 1 'Low' 2 'Good' 3 'Excellent' 4 'Outstanding'
          </li>
          <li>
            EnvironmentSatisfaction 1 'Low' 2 'Medium' 3 'High' 4 'Very High'
          </li>
          <li>
            RelationshipSatisfaction 1 'Low' 2 'Medium' 3 'High' 4 'Very High'
          </li>
          <li>
            StandardHours: Is the number of hours of production time that should
            have been used during an working period.
          </li>
          <li>
            {" "}
            StockOptionLevel: Employee stock options, also known as ESOs, are
            stock options in the company’s stock granted by an employer to
            certain employees. Typically they are granted to those in management
            or officer-level positions. Stock options give the employee the
            right to buy a certain amount of stock at a specific price, during a
            specific period of time. Options typically have expiration dates as
            well, by which the options must have been exercised, otherwise they
            will become worthless.{" "}
          </li>
          <li> </li>
          <li> </li>
          <li> </li>
          <li> </li>
          <li> </li>
          <li> </li>
          <li> </li>
          <li> </li>
          <li> </li>
          <li> </li>
          <li> </li>
        </ul>
      </Card>
    </Container>
  );
}
