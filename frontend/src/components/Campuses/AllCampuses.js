import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllCampuses() {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/campuses')
      .then(res => {
        setCampuses(res.data);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load campuses. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>All Campuses Page</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && loading && <p>Loading campuses...</p>}
      {!error && !loading && campuses.length === 0 && <p>No campuses found.</p>}
      {!error && !loading && campuses.length > 0 && (
        <ul>
          {campuses.map(campus => (
            <li key={campus.id}>
              <strong>{campus.name}</strong> — {campus.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
