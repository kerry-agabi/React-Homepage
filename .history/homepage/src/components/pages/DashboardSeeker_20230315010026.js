import React, { useState } from "react";
import { database, storage } from "./firebase";

function DashboardSeeker() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workExperience, setWorkExperience] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleWorkExperienceChange = (event) => {
    setWorkExperience(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Upload the CV file to Firebase Storage
    const file = event.target.cv.files[0];
    const storageRef = storage.ref(`cv/${file.name}`);
    const snapshot = await storageRef.put(file);
    const cvUrl = await snapshot.ref.getDownloadURL();

    // Save the job seeker's details to the Realtime Database
    database.ref("jobSeekers").push({
      name,
      email,
      workExperience,
      cvUrl,
    });

    // Reset the form fields
    setName("");
    setEmail("");
    setWorkExperience("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Work Experience:
        <textarea value={workExperience} onChange={handleWorkExperienceChange} />
      </label>
      <label>
        CV:
        <input type="file" name="cv" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DashboardSeeker;
