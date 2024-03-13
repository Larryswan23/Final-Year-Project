import React, { useState } from 'react';
import Galway from './Galway'; // Adjust the path as needed
import Kerry from './kerry'; // Adjust the path as needed

const Home = () => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  // If a location is selected, render it. Otherwise, show the selection options.
  if (location) {
    return location === 'Galway' ? <Galway /> : <Kerry />;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#333', color: '#fff' }}>
      <h2>Where is the search being held?</h2>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handleLocationChange('Galway')} style={{ margin: '0 10px', padding: '10px 20px', background: 'grey', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Galway</button>
        <button onClick={() => handleLocationChange('Kerry')} style={{ margin: '0 10px', padding: '10px 20px', background: 'grey', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Kerry</button>
      </div>
    </div>
  );
};

export default Home;


