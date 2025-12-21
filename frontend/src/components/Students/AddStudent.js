// AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gpa: '',
    imageUrl: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('First Name, Last Name, and Email are required.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/students', formData);
      navigate('/students'); // redirect to All Students page
    } catch (err) {
      console.error(err);
      setError('Failed to add student. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Student</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name: </label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>GPA: </label>
          <input type="number" step="0.01" name="gpa" value={formData.gpa} onChange={handleChange} min="0" max="4" />
        </div>
        <div>
          <label>Image URL: </label>
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
