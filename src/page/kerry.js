import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getFirestore, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseSetup/firebase';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3dhbmxhcnJ5MjMiLCJhIjoiY2xzYnB2dnAwMDl0YTJpbm95Nzc3N2EzdSJ9.s2J8b-FdV_H0d7mBnJuUOw';

const Kerry = () => {
  const mapContainerRef = useRef(null);
  const [user, setUser] = useState(null);
  const [gridData, setGridData] = useState(Array(400).fill(false));
  const db = getFirestore();

  useEffect(() => {
    // Update these coordinates to center the map on Kerry
    const kerryCoordinates = [-9.833889, 52.266944];
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: kerryCoordinates,
      zoom: 11.7,
    });

    map.addControl(new mapboxgl.NavigationControl());
    // Update these bounds to fit Kerry as needed
    const bounds = [-10.0, 52.0, -9.2, 52.5];
    map.setMaxBounds(bounds);

    const unsubscribe = onSnapshot(doc(db, "KerryGrid", "values"), (doc) => {
      if (doc.exists()) {
        const data = doc.data().values;
        setGridData(data);
      }
    });

    return () => {
      map.remove();
      unsubscribe();
    };
  }, [db]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const toggleSquare = async (index) => {
    if (!user) {
      alert("You must be logged in to edit the grid.");
      return;
    }

    const updatedGridData = [...gridData];
    updatedGridData[index] = !updatedGridData[index];
    try {
      await updateDoc(doc(db, "KerryGrid", "values"), { values: updatedGridData });
    } catch (error) {
      console.error('Error updating grid data: ', error);
      alert("Failed to update the grid. Please try again.");
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#333', color: '#fff', padding: '10px' }}>
        <h2>Kerry</h2>
        {user ? (
          <div>
            <span>Welcome, {user.email}!</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px', background: 'red', color: '#fff', border: 'none', cursor: 'pointer' }}>Logout</button>
          </div>
        ) : (
          <span>Log in to edit and see grid data.</span>
        )}
      </div>
      <section style={{ position: 'relative', height: 'calc(100vh - 40px)', overflow: 'hidden' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%', position: 'absolute' }}></div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(20, 1fr)',
          gridTemplateRows: 'repeat(20, 1fr)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'auto',
        }}>
          {gridData.map((isActive, index) => (
            <div
              key={index}
              onClick={() => toggleSquare(index)}
              style={{
                border: '1px solid rgba(0, 0, 0, 0.2)',
                backgroundColor: isActive ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 128, 0, 0.5)',
                cursor: 'pointer',
              }}
            ></div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Kerry;
