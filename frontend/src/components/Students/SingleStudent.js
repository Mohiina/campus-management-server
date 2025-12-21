import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function SingleStudent() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/students/${studentId}`)
      .then(res => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load student. Please try again later.');
        setLoading(false);
      });
  }, [studentId]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/api/students/${studentId}`)
      .then(() => navigate('/students'))
      .catch(err => {
        console.error(err);
        alert('Failed to delete student');
      });
  };

  if (loading) return <p>Loading student...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!student) return <p>No student found.</p>;

  return (
    <div>
      <h2>{student.firstName} {student.lastName}</h2>
      <img 
        src={student.imageUrl || 'https://via.placeholder.com/150'} 
        alt={`${student.firstName} ${student.lastName}`} 
        style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa !== null ? student.gpa : 'N/A'}</p>
      <p>
        Campus: {student.campus ? (
          <Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>
        ) : 'Not enrolled'}
      </p>

      <div style={{ marginTop: '10px' }}>
        <Link to={`/student/edit/${student.id}`} style={{ marginRight: '10px' }}>Edit</Link>
        <button 
          onClick={handleDelete} 
          style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
