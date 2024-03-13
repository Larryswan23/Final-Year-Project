import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseSetup/firebase'; // Adjust this import path to your Firebase auth setup
import Home from './page/Home'; // Adjust the import path as needed
import Signup from './page/Signup'; // Adjust the import path as needed
import Login from './page/Login'; // Adjust the import path as needed
import 'bootstrap/dist/css/bootstrap.min.css';
import Kerry from './page/kerry';

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
        <Navbar.Brand href="#home">GridGuardian</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/kerry">Kerry</Nav.Link>
            <Nav.Link as={Link} to="/signup" hidden={user}>Signup</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="mr-2">
                  Welcome, {user.email}!
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div style={{ margin: '0 20px' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/kerry" element={<Kerry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



