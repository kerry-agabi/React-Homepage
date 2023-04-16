import React, { useState } from "react";
import axios from "axios";
import './EmployeeForm.css'
import { Button, Form } from "react-bootstrap";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState({
    Age: "",
    DailyRate: "",
    DistanceFromHome: "",
    Education: "",
    EnvironmentSatisfaction: "",
    HourlyRate: "",
    JobInvolvement: "",
    JobLevel: "",
    JobSatisfaction: "",
    MonthlyIncome: "",
    MonthlyRate: "",
    NumCompaniesWorked: "",
    PercentSalaryHike: "",
    PerformanceRating: "",
    RelationshipSatisfaction: "",
    StockOptionLevel: "",
    TotalWorkingYears: "",
    TrainingTimesLastYear: "",
    WorkLifeBalance: "",
    YearsAtCompany: "",
    YearsInCurrentRole: "",
    YearsSinceLastPromotion: "",
    YearsWithCurrManager: "",
    BusinessTravel_Travel_Frequently: "",
    BusinessTravel_Travel_Rarely: "",
    Department_Research__Development: "",
    Department_Sales: "",
    EducationField_Life_Sciences: "",
    EducationField_Marketing: "",
    EducationField_Medical: "",
    EducationField_Other: "",
    EducationField_Technical_Degree: "",
    Gender_Male: "",
    JobRole_Human_Resources: "",
    JobRole_Laboratory_Technician: "",
    JobRole_Manager: "",
    JobRole_Manufacturing_Director: "",
    JobRole_Research_Director: "",
    JobRole_Research_Scientist: "",
    JobRole_Sales_Executive: "",
    JobRole_Sales_Representative: "",
    MaritalStatus_Married: "",
    MaritalStatus_Single: "",
    OverTime_Yes: ""
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", employeeData);
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
    <div className="card">
      <h1>Employee Attrition Prediction</h1>
      <form onSubmit={handleSubmit}>
        {/* Render input fields for each employee feature */}
        <div>
          <label htmlFor="Age">Age:</label>
          <input type="number" name="Age" onChange={handleChange} value={employeeData.Age} required />
        </div>
        <div>
          <label htmlFor="DailyRate">Daily Rate:</label>
          <input type="number" name="DailyRate" onChange={handleChange} value={employeeData.DailyRate} required />
        </div>
        <div>
          <label htmlFor="DistanceFromHome">Distance From Home:</label>
          <input type="number" name="DistanceFromHome" onChange={handleChange} value={employeeData.DistanceFromHome} required />
        </div>
        <div>
          <label htmlFor="Education">Education:</label>
          <input type="number" name="Education" onChange={handleChange} value={employeeData.Education} required />
        </div>
        <div>
          <label htmlFor="EnvironmentSatisfaction">Environment Satisfaction:</label>
          <input type="number" name="EnvironmentSatisfaction" onChange={handleChange} value={employeeData.EnvironmentSatisfaction} required />
        </div>
               <div>
          <label htmlFor="HourlyRate">Hourly Rate:</label>
          <input type="number" name="HourlyRate" onChange={handleChange} value={employeeData.HourlyRate} required />
        </div>
        <div>
          <label htmlFor="JobInvolvement">Job Involvement:</label>
          <input type="number" name="JobInvolvement" onChange={handleChange} value={employeeData.JobInvolvement} required />
        </div>
        <div>
          <label htmlFor="JobLevel">Job Level:</label>
          <input type="number" name="JobLevel" onChange={handleChange} value={employeeData.JobLevel} required />
        </div>
        <div>
          <label htmlFor="JobSatisfaction">Job Satisfaction:</label>
          <input type="number" name="JobSatisfaction" onChange={handleChange} value={employeeData.JobSatisfaction} required />
        </div>
        <div>
          <label htmlFor="MonthlyIncome">Monthly Income:</label>
          <input type="number" name="MonthlyIncome" onChange={handleChange} value={employeeData.MonthlyIncome} required />
        </div>
        <div>
          <label htmlFor="MonthlyRate">Monthly Rate:</label>
          <input type="number" name="MonthlyRate" onChange={handleChange} value={employeeData.MonthlyRate} required />
        </div>
        <div>
          <label htmlFor="NumCompaniesWorked">Number of Companies Worked:</label>
          <input type="number" name="NumCompaniesWorked" onChange={handleChange} value={employeeData.NumCompaniesWorked} required />
        </div>
        <div>
          <label htmlFor="PercentSalaryHike">Percent Salary Hike:</label>
          <input type="number" name="PercentSalaryHike" onChange={handleChange} value={employeeData.PercentSalaryHike} required />
        </div>
        <div>
          <label htmlFor="PerformanceRating">Performance Rating:</label>
          <input type="number" name="PerformanceRating" onChange={handleChange} value={employeeData.PerformanceRating} required />
        </div>
        <div>
          <label htmlFor="RelationshipSatisfaction">Relationship Satisfaction:</label>
          <input type="number" name="RelationshipSatisfaction" onChange={handleChange} value={employeeData.RelationshipSatisfaction} required />
        </div>
        <div>
          <label htmlFor="StockOptionLevel">Stock Option Level:</label>
          <input type="number" name="StockOptionLevel" onChange={handleChange} value={employeeData.StockOptionLevel} required />
        </div>
        <div>
          <label htmlFor="TotalWorkingYears">Total Working Years:</label>
          <input type="number" name="TotalWorkingYears" onChange={handleChange} value={employeeData.TotalWorkingYears} required />
        </div>
        <div>
          <label htmlFor="TrainingTimesLastYear">Training Times Last Year:</label>
          <input type="number" name="TrainingTimesLastYear" onChange={handleChange} value={employeeData.TrainingTimesLastYear} required />
        </div>
        <div>
          <label htmlFor="WorkLifeBalance">Work Life Balance:</label>
          <input type="number" name="WorkLifeBalance" onChange={handleChange} value={employeeData.WorkLifeBalance} required />
        </div>
        <div>
          <label htmlFor="YearsAtCompany">Years At Company:</label>
          <input type="number" name="YearsAtCompany" onChange={handleChange} value={employeeData.YearsAtCompany} required />
        </div>
        <div>
          <label htmlFor          ="YearsInCurrentRole">Years In Current Role:</label>
          <input type="number" name="YearsInCurrentRole" onChange={handleChange} value={employeeData.YearsInCurrentRole} required />
        </div>
        <div>
          <label htmlFor="YearsSinceLastPromotion">Years Since Last Promotion:</label>
          <input type="number" name="YearsSinceLastPromotion" onChange={handleChange} value={employeeData.YearsSinceLastPromotion} required />
        </div>
        <div>
          <label htmlFor="YearsWithCurrManager">Years With Current Manager:</label>
          <input type="number" name="YearsWithCurrManager" onChange={handleChange} value={employeeData.YearsWithCurrManager} required />
        </div>
        <div>
          <label htmlFor="BusinessTravel_Travel_Frequently">Business Travel: Frequently</label>
          <input type="number" name="BusinessTravel_Travel_Frequently" onChange={handleChange} value={employeeData.BusinessTravel_Travel_Frequently} required />
        </div>
        <div>
          <label htmlFor="BusinessTravel_Travel_Rarely">Business Travel: Rarely</label>
          <input type="number" name="BusinessTravel_Travel_Rarely" onChange={handleChange} value={employeeData.BusinessTravel_Travel_Rarely} required />
        </div>
        <div>
          <label htmlFor="Department_Research__Development">Department: Research & Development</label>
          <input type="number" name="Department_Research__Development" onChange={handleChange} value={employeeData.Department_Research__Development} required />
        </div>
        <div>
          <label htmlFor="Department_Sales">Department: Sales</label>
          <input type="number" name="Department_Sales" onChange={handleChange} value={employeeData.Department_Sales} required />
        </div>
        <div>
          <label htmlFor="EducationField_Life_Sciences">Education Field: Life Sciences</label>
          <input type="number" name="EducationField_Life_Sciences" onChange={handleChange} value={employeeData.EducationField_Life_Sciences} required />
        </div>
        <div>
          <label htmlFor="EducationField_Marketing">Education Field: Marketing</label>
          <input type="number" name="EducationField_Marketing" onChange={handleChange} value={employeeData.EducationField_Marketing} required />
        </div>
        <div>
          <label htmlFor="EducationField_Medical">Education Field: Medical</label>
          <input type="number" name="EducationField_Medical" onChange={handleChange} value={employeeData.EducationField_Medical} required />
        </div>
        <div>
          <label htmlFor="EducationField_Other">Education Field: Other</label>
          <input type="number" name="EducationField_Other" onChange={handleChange} value={employeeData.EducationField_Other} required />
        </div>
        <div>
          <label htmlFor="EducationField_Technical_Degree">Education Field: Technical Degree</label>
          <input type="number" name="EducationField_Technical_Degree" onChange={handleChange} value={employeeData.EducationField_Technical_Degree} required />
        </div>
        <div>
          <label htmlFor="Gender_Male">Gender: Male</label>
          <input type="number" name="Gender_Male" onChange={handleChange} value={employeeData.Gender_Male} required />
        </div>
        <div>
          <label htmlFor="JobRole_Human_Resources">Job Role: Human Resources</label>
          <input type="number" name="JobRole_Human_Resources" onChange={handleChange} value={employeeData.JobRole_Human_Resources} required />
        </div>
        <div>
          <label htmlFor="JobRole_Laboratory_Technician">Job Role: Laboratory Technician</label>
          <input type="number" name="JobRole_Laboratory_Technician" onChange={handleChange} value={employeeData.JobRole_Laboratory_Technician} required />
        </div>
        <div>
          <label htmlFor="JobRole_Manager">Job Role: Manager</label>
          <input type="number" name="JobRole_Manager" onChange={handleChange} value={employeeData.JobRole_Manager} required />
        </div>
        <div>
          <label htmlFor="JobRole_Manufacturing_Director">Job Role: Manufacturing Director</label>
          <input type="number" name="JobRole_Manufacturing_Director" onChange={handleChange} value={employeeData.JobRole_Manufacturing_Director} required />
        </div>
        <div>
          <label htmlFor="JobRole_Research_Director">Job Role: Research Director</label>
          <input type="number" name="JobRole_Research_Director" onChange={handleChange} value={employeeData.JobRole_Research_Director} required />
        </div>
        <div>
          <label htmlFor="JobRole_Research_Scientist">Job Role: Research Scientist</label>
          <input type="number" name="JobRole_Research_Scientist" onChange={handleChange} value={employeeData.JobRole_Research_Scientist} required />
        </div>
        <div>
          <label htmlFor="JobRole_Sales_Executive">Job Role: Sales Executive</label>
          <input type="number" name="JobRole_Sales_Executive" onChange={handleChange} value={employeeData.JobRole_Sales_Executive} required />
        </div>
        <div>
          <label htmlFor="JobRole_Sales_Representative">Job Role: Sales Representative</label>
          <input type="number" name="JobRole_Sales_Representative" onChange={handleChange} value={employeeData.JobRole_Sales_Representative} required />
        </div>
        <div>
          <label htmlFor="MaritalStatus_Married">Marital Status: Married</label>
          <input type="number" name="MaritalStatus_Married" onChange={handleChange} value={employeeData.MaritalStatus_Married} required />
        </div>
        <div>
          <label htmlFor="MaritalStatus_Single">Marital Status: Single</label>
          <input type="number" name="MaritalStatus_Single" onChange={handleChange} value={employeeData.MaritalStatus_Single} required />
        </div>
        <div>
          <label htmlFor="OverTime_Yes">Overtime: Yes</label>
          <input type="number" name="OverTime_Yes" onChange={handleChange} value={employeeData.OverTime_Yes} required />
        </div>
        <Button type="submit">Predict</Button>
        <Form action="/user-guide">
  <Button type="submit">User Guide</Button>
</Form>
      </form>
      {result && (
        <div>
          <p>Attrition: {result.attrition}</p>
          <p>Probability: {result.probability.toFixed(2)}%</p>
        </div>
      )}

      
    </div>
    </div>
  );
}

export default Employee;



