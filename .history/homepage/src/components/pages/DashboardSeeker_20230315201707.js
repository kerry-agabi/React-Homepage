import React, { useState } from "react";
import { rtdb } from '../../firebase';

function DashboardSeeker() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const jobSeekerRef = rtdb.child("jobSeekers").push();
      jobSeekerRef.set({
        firstName,
        lastName,
        email,
        phone,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    };
  
    return (
      <div>
        <h1>Realtime Database Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default DashboardSeeker;