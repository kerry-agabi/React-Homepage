import React from 'react';

function JobCard(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
  };

  return (
    <div>
      <h2>Job Application</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Resume:
          <input type="file" name="resume" />
        </label>
        <label>
          Cover Letter:
          <textarea name="cover-letter" />
        </label>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default JobCard;