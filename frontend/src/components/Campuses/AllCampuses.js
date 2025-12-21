import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  //delete button
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/campuses/${id}`)
      .then(() => {
        setCampuses(campuses.filter(c => c.id !== id));
      })
      .catch(err => {
        console.error(err);
        alert('Failed to delete campus');
      });
  };
  

  return (
    <div>
      <h2>All Campuses Page</h2>


        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <Link 
        to="/campus/add" 
        style={{ display: 'inline-block', marginBottom: '10px', backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '4px', textDecoration: 'none' }}
        >
        + Add New Campus
        </Link>

        {!error && loading && <p>Loading campuses...</p>}
        {!error && !loading && campuses.length === 0 && <p>No campuses found.</p>}
        {!error && !loading && campuses.length > 0 && (
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {campuses.map(campus => (
                <div key={campus.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', width: '200px' }}>
                    <Link to={`/campus/${campus.id}`}>
                    <img 
                        src={campus.imageUrl || 'https://via.placeholder.com/150'} 
                        alt={campus.name} 
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <h3>{campus.name}</h3>
                    </Link>
                    <p>{campus.address}</p>
                    <button 
                    onClick={() => handleDelete(campus.id)}
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
