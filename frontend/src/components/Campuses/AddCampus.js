import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCampus() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
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
    if (!formData.name || !formData.address) {
      setError('Name and Address are required.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/campuses', formData);
      navigate('/campuses'); // redirect to All Campuses page
    } catch (err) {
      console.error(err);
      setError('Failed to add campus. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Campus</h2>
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
        <button type="submit">Add Campus</button>
      </form>
    </div>
  );
}
