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
        <h2>
          Attrition:- <em>company losing its customer base</em>
        </h2>
        <p>
          <strong>
            Attrition is a process in which the workforce dwindles at a company,
            following a period in which a number of people retire or resign, and
            are not replaced.
          </strong>
        </p>
        <ul>
          <li>
            A reduction in staff due to attrition is often called a hiring
            freeze and is seen as a less disruptive way to trim the workforce
            and reduce payroll than layoffs
          </li>
          <li>In this NoteBook our Aim will be to:</li>
          <ul>
            <li>Analyze the datasets completely wrt each and feature</li>
            <li>Find the reason behind Attrition of Employees.</li>
          </ul>
          <li>Identify the top factors which lead to employee attrition.</li>
        </ul>
      </Card>
    </Container>
  );
}
