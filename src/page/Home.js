// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseSetup/firebase';
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore';

// Component for each square in the grid
const GridSquare = ({ value, onClick, index, squareSize }) => {
  // Style for the square
  const style = {
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    border: '1px solid #ccc',
    backgroundColor: getColor(value), // Set background color based on value
    cursor: 'pointer',
    opacity: 0.7, // Adjust the opacity (0 to 1)
  };

  // Function to determine color based on value
  function getColor(value) {
    if (value === 1) {
      return 'red';
    } else if (value === 2) {
      return 'green';
    } else {
      return 'white';
    }
  }

  // Render the square with the determined style
  return <div style={style} onClick={() => onClick(index)}></div>;
};

// Component for the entire grid
const Grid = ({ numRows, numCols, squareSize }) => {
  // State for the grid data
  const [grid, setGrid] = useState(Array.from({ length: numRows * numCols }, () => 0));

  // Use effect to subscribe to changes in the grid data in Firestore
  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(doc(db, 'Grid', 'values'), (doc) => {
      if (doc.exists()) {
        const data = doc.data().values || Array.from({ length: numRows * numCols }, () => 0);
        setGrid(data); // Update grid state with data from Firestore
      }
    });

    return () => unsubscribe();
  }, [numRows, numCols]);

  const handleSquareClick = (index) => {
    const db = getFirestore();
    const squareRef = doc(db, 'Grid', 'values');
    const newGrid = [...grid];
    newGrid[index] = (newGrid[index] + 1) % 3; // Toggle the value of the clicked square
  
    // Filter out undefined values
    const validGrid = newGrid.filter((value) => value !== undefined);
  
    setGrid(newGrid);
  
    // Update the data in Firestore with the new grid values
    setDoc(squareRef, { values: validGrid });
  };
  

  // Render the grid
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {Array.from({ length: numCols }).map((_, colIndex) => (
            <GridSquare
              key={colIndex}
              value={grid[rowIndex * numCols + colIndex]}
              index={rowIndex * numCols + colIndex}
              onClick={handleSquareClick}
              squareSize={squareSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Component for the home page
const Home = () => {
  // State for the user data
  const [user, setUser] = useState(null);
  const numRows = 8; // Adjust the number of rows
  const numCols = 10; // Adjust the number of columns
  const squareSize = 50; // Adjust the size of each grid square

  // Use effect to subscribe to changes in the user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user); // Set user state if logged in
        console.log('uid', uid);
      } else {
        setUser(null); // Set user state to null if logged out
        console.log('user is logged out');
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  // Render the home page with user information and the grid component
  return (
    <section style={{ position: 'relative', width: `${numCols * squareSize}px` }}>
      {/* Background Image */}
      <img
        src={process.env.PUBLIC_URL + '/images/GalwayBay.jpg'}
        alt="Background"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />

      <div>
        {user ? (
          <>
            <p>Welcome, {user.email}! You are logged in.</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>You are not logged in.</p>
        )}
        <Grid numRows={numRows} numCols={numCols} squareSize={squareSize} />
      </div>
    </section>
  );
};

// Export the Home component as the default export
export default Home;




















