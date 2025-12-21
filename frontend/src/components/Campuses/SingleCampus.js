import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function SingleCampus() {
  const { campusId } = useParams();
  const navigate = useNavigate();
  const [campus, setCampus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/campuses/${campusId}`)
      .then(res => {
        setCampus(res.data);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load campus. Please try again later.');
        setLoading(false);
      });
  }, [campusId]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/api/campuses/${campusId}`)
      .then(() => {
        navigate('/campuses'); // go back to all campuses
      })
      .catch(err => {
        console.error(err);
        alert('Failed to delete campus');
      });
  };

  if (loading) return <p>Loading campus...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!campus) return <p>Campus not found.</p>;

  return (
    <div>
      <h2>{campus.name}</h2>
      <img 
        src={campus.imageUrl || 'https://via.placeholder.com/300'} 
        alt={campus.name} 
        style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <p>Address: {campus.address}</p>
      <p>{campus.description || 'No description provided.'}</p>

      <h3>Students</h3>
      {campus.students && campus.students.length > 0 ? (
        <ul>
          {campus.students.map(student => (
            <li key={student.id}>
              <Link to={`/student/${student.id}`}>
                {student.firstName} {student.lastName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students enrolled at this campus.</p>
      )}

      <div style={{ marginTop: '10px' }}>
        <Link to={`/campus/edit/${campus.id}`} style={{ marginRight: '10px' }}>Edit Campus</Link>
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
          Delete Campus
        </button>
      </div>
    </div>
  );
}
