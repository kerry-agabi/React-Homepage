import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import './EmployeeForm.css'



import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import './EmployeeForm.css'

const EmployeeForm = () => {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const oneHotEncodedData = oneHotEncode(formData);
    try {
      const response = await axios.post('http://localhost:5000/predict', oneHotEncodedData);
      setResult(response.data);
    } catch (error) {
      console.error('Error making API request:', error);
    }
  };

  const oneHotEncode = (data) => {
    // One-hot encoding for categorical variables
    const businessTravel = {
      'BusinessTravel_Travel_Frequently': data.businessTravel === 'Travel_Frequently' ? 1 : 0,
      'BusinessTravel_Travel_Rarely': data.businessTravel === 'Travel_Rarely' ? 1 : 0,
    };

    const department = {
      'Department_Research & Development': data.department === 'Research & Development' ? 1 : 0,
      'Department_Sales': data.department === 'Sales' ? 1 : 0,
    };

    const educationField = {
      'EducationField_Life Sciences': data.educationField === 'Life Sciences' ? 1 : 0,
      'EducationField_Marketing': data.educationField === 'Marketing' ? 1 : 0,
      'EducationField_Medical': data.educationField === 'Medical' ? 1 : 0,
      'EducationField_Other': data.educationField === 'Other' ? 1 : 0,
      'EducationField_Technical Degree': data.educationField === 'Technical Degree' ? 1 : 0,
    };

    const gender = {
      'Gender_Male': data.gender === 'Male' ? 1 : 0,
    };

    const jobRole = {
      'JobRole_Human Resources': data.jobRole === 'Human Resources' ? 1 : 0,
      'JobRole_Laboratory Technician': data.jobRole === 'Laboratory Technician' ? 1 : 0,
      'JobRole_Manager': data.jobRole === 'Manager' ? 1 : 0,
      'JobRole_Manufacturing Director': data.jobRole === 'Manufacturing Director' ? 1 : 0,
      'JobRole_Research Director': data.jobRole === 'Research Director' ? 1 : 0,
      'JobRole_Research Scientist': data.jobRole === 'Research Scientist' ? 1 : 0,
      'JobRole_Sales Executive': data.jobRole === 'Sales Executive' ? 1 : 0,
      'JobRole_Sales Representative': data.jobRole === 'Sales Representative' ? 1 : 0,
    };

    const maritalStatus = {
        'MaritalStatus_Married': data.maritalStatus === 'Married' ? 1 : 0,
        'MaritalStatus_Single': data.maritalStatus === 'Single' ? 1 : 0,
      };
  
      const overTime = {
        'OverTime_Yes': data.overTime === 'Yes' ? 1 : 0,
      };
  
      return {
        ...data,
        ...businessTravel,
        ...department,
        ...educationField,
        ...gender,
        ...jobRole,
        ...maritalStatus,
        ...overTime,
      };
    };

  return (
    <div className="container">
    <div className="card">
      <h1>Employee Attrition Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" id="age" onChange={handleChange} />

        {/* Add the rest of the form fields here */}
        <label htmlFor="dailyRate">Daily Rate:</label>
        <input type="number" name="dailyRate" id="dailyRate" onChange={handleChange} />
        <label htmlFor="distanceFromHome">Distance From Home:</label>
<input type="number" name="distanceFromHome" id="distanceFromHome" onChange={handleChange} />

<label htmlFor="education">Education:</label>
<select name="education" id="education" onChange={handleChange}>
  <option value="">Select an option</option>
  <option value="1">Below College</option>
  <option value="2">College</option>
  <option value="3">Bachelor</option>
  <option value="4">Master</option>
  <option value="5">Doctor</option>
</select>

<label htmlFor="environmentSatisfaction">Environment Satisfaction:</label>
<input type="number" name="environmentSatisfaction" id="environmentSatisfaction" onChange={handleChange} />

<label htmlFor="hourlyRate">Hourly Rate:</label>
<input type="number" name="hourlyRate" id="hourlyRate" onChange={handleChange} />

<label htmlFor="jobInvolvement">Job Involvement:</label>
<input type="number" name="jobInvolvement" id="jobInvolvement" onChange={handleChange} />

<label htmlFor="jobLevel">Job Level:</label>
<input type="number" name="jobLevel" id="jobLevel" onChange={handleChange} />

<label htmlFor="jobRole">Job Role:</label>
<select name="jobRole" id="jobRole" onChange={handleChange}>
  <option value="">Select an option</option>
  <option value="Sales Executive">Sales Executive</option>
  <option value="Research Scientist">Research Scientist</option>
  <option value="Laboratory Technician">Laboratory Technician</option>
  <option value="Manufacturing Director">Manufacturing Director</option>
  <option value="Healthcare Representative">Healthcare Representative</option>
  <option value="Manager">Manager</option>
  <option value="Sales Representative">Sales Representative</option>
  <option value="Research Director">Research Director</option>
  <option value="Human Resources">Human Resources</option>
</select>

<label htmlFor="jobSatisfaction">Job Satisfaction:</label>
<input type="number" name="jobSatisfaction" id="jobSatisfaction" onChange={handleChange} />

<label htmlFor="monthlyIncome">Monthly Income:</label>
<input type="number" name="monthlyIncome" id="monthlyIncome" onChange={handleChange} />

<label htmlFor="monthlyRate">Monthly Rate:</label>
<input type="number" name="monthlyRate" id="monthlyRate" onChange={handleChange} />

<label htmlFor="numCompaniesWorked">Number of Companies Worked:</label>
<input type="number" name="numCompaniesWorked" id="numCompaniesWorked" onChange={handleChange} />

<label htmlFor="percentSalaryHike">Percent Salary Hike:</label>
<input type="number" name="percentSalaryHike" id="percentSalaryHike" onChange={handleChange} />


<label htmlFor="relationshipSatisfaction">Relationship Satisfaction:</label>
<input type="number" name="relationshipSatisfaction" id="relationshipSatisfaction" onChange={handleChange} />

<label htmlFor="standardHours">Standard Hours:</label>
<input type="number" name="standardHours" id="standardHours" onChange={handleChange} />

<label htmlFor="stockOptionLevel">Stock Option Level:</label>
<input type="number" name="stockOptionLevel" id="stockOptionLevel" onChange={handleChange} />

<label htmlFor="totalWorkingYears">Total Working Years:</label>
<input type="number" name="totalWorkingYears" id="totalWorkingYears" onChange={handleChange} />

<label htmlFor="trainingTimesLastYear">Training Times Last Year:</label>
<input type="number" name="trainingTimesLastYear" id="trainingTimesLastYear" onChange={handleChange} />

<label htmlFor="workLifeBalance">Work Life Balance:</label>
<input type="number" name="workLifeBalance" id="workLifeBalance" onChange={handleChange} />

<label htmlFor="yearsAtCompany">Years at Company:</label>
<input type="number" name="yearsAtCompany" id="yearsAtCompany" onChange={handleChange} />

<label htmlFor="yearsInCurrentRole">Years in Current Role:</label>
<input type="number" name="yearsInCurrentRole" id="yearsInCurrentRole" onChange={handleChange} />

<label htmlFor="yearsSinceLastPromotion">Years Since Last Promotion:</label>
<input type="number" name="yearsSinceLastPromotion" id="yearsSinceLastPromotion" onChange={handleChange} />

<label htmlFor="yearsWithCurrManager">Years with Current Manager:</label>
<input type="number" name="yearsWithCurrManager" id="yearsWithCurrManager" onChange={handleChange} />

<div className="radio-group">
  <label htmlFor="overTime">Over Time:</label>
  <div>
    <input type="radio" name="overTime" id="overTimeYes" value="Yes" onChange={handleChange} />
    <label htmlFor="overTimeYes">Yes</label>
  </div>
  <div>
    <input type="radio" name="overTime" id="overTimeNo" value="No" onChange={handleChange} />
    <label htmlFor="overTimeNo">No</label>
  </div>
</div>

<div className="radio-group">
  <label htmlFor="maritalStatus">Marital Status:</label>
  <div>
    <input type="radio" name="maritalStatus" id="single" value="Single" onChange={handleChange} />
    <label htmlFor="single">Single</label>
  </div>
  <div>
    <input type="radio" name="maritalStatus" id="married" value="Married" onChange={handleChange} />
    <label htmlFor="married">Married</label>
  </div>
  <div>
    <input type="radio" name="maritalStatus" id="divorced" value="Divorced" onChange={handleChange} />
    <label htmlFor="divorced">Divorced</label>
  </div>
</div>

<div className="radio-group">
  <label htmlFor="gender">Gender:</label>
  <div>
    <input type="radio" name="gender" id="male" value="Male" onChange={handleChange} />
    <label htmlFor="male">Male</label>
  </div>
  <div>
    <input type="radio" name="gender" id="female" value="Female" onChange={handleChange} />
    <label htmlFor="female">Female</label>
  </div>
</div>


        {/* More form fields */}

        <button type="submit">Predict Attrition</button>
      </form>
      {result && (
        <div>
          <h2>Attrition: {result.attrition}</h2>
          <h2>Probability: {result.probability.toFixed(2)}%</h2>
        </div>
      )}
    </div>
    </div>
  );
};

export default EmployeeForm;
