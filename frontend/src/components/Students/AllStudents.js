import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h2>All Students Page</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && loading && <p>Loading students...</p>}
      {!error && !loading && students.length === 0 && <p>No students found.</p>}
      {!error && !loading && students.length > 0 && (
        <ul>
          {students.map(student => (
            <li key={student.id}>
              {student.firstName} {student.lastName} — GPA: {student.gpa}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
