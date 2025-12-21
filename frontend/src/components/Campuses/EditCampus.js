// EditCampus.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditCampus() {
  const { campusId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    imageUrl: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/campuses/${campusId}`)
      .then(res => setFormData(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load campus data.');
      });
  }, [campusId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      setError('Name and Address are required.');
      return;
    }

    try {
      await axios.put(`http://localhost:3001/api/campuses/${campusId}`, formData);
      navigate(`/campus/${campusId}`); // redirect to the single campus page
    } catch (err) {
      console.error(err);
      setError('Failed to update campus. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Campus</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Address: </label>
          <input name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Description: </label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Image URL: </label>
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </div>
        <button type="submit">Update Campus</button>
      </form>
    </div>
  );
}
