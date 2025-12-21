import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/students')
      .then(res => {
        setStudents(res.data);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load students. Please try again later.');
        setLoading(false);
      });
  }, []);

  //delete button
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/students/${id}`)
      .then(() => {
        setStudents(students.filter(s => s.id !== id));
      })
      .catch(err => {
        console.error(err);
        alert('Failed to delete student');
      });
  };
  

  return (
    <div>
      <h2>All Students Page</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

        <Link 
        to="/student/add" 
        style={{ display: 'inline-block', marginBottom: '10px', backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '4px', textDecoration: 'none' }}
        >
        + Add New Student
        </Link>

        {!error && loading && <p>Loading students...</p>}
        {!error && !loading && students.length === 0 && <p>No students found.</p>}
        {!error && !loading && students.length > 0 && (
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {students.map(student => (
                <div key={student.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', width: '200px' }}>
                    <Link to={`/student/${student.id}`}>
                    <img 
                        src={student.imageUrl || 'https://via.placeholder.com/150'} 
                        alt={`${student.firstName} ${student.lastName}`} 
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <h3>{student.firstName} {student.lastName}</h3>
                    </Link>
                    <p>GPA: {student.gpa !== null ? student.gpa : 'N/A'}</p>
                    <button 
                    onClick={() => handleDelete(student.id)}
                    style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                    Delete
                    </button>
                </div>
                ))}
            </div>
      </div>
      
      )}
    </div>
  );
}
