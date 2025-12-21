import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/campuses" style={{ marginRight: '10px' }}>Campuses</Link>
      <Link to="/students" style={{ marginRight: '10px' }}>Students</Link>
    
    </nav>
  );
}
