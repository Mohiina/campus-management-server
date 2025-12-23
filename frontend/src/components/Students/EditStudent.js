// EditStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditStudent() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gpa: '',
    imageUrl: '',
    campusId: '',
  });

  const [error, setError] = useState('');
  const [campuses, setCampuses] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:3001/api/students/${studentId}`)
      .then(res => setFormData(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load student data.');
      });
  }, [studentId]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/campuses')
      .then(res => setCampuses(res.data))
      .catch(err => console.error(err));
  }, []);

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
      await axios.put(`http://localhost:3001/api/students/${studentId}`, formData);
      navigate(`/student/${studentId}`); // redirect to single student page
    } catch (err) {
      console.error(err);
      setError('Failed to update student. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
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
        <div>
          <label>Campus: </label>
          <select
            name="campusId"
            value={formData.campusId || ''}
            onChange={handleChange}
          >
            <option value="">Not Enrolled</option>
            {campuses.map(campus => (
              <option key={campus.id} value={campus.id}>
                {campus.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}
