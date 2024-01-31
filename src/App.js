import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import FormComponent from './FormComponent';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <Router>
      <div style={{ width: '100%' }}>
        {/* Navbar */}
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">
            FocusApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">
                <Button variant="outline-light">Home</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-light">Login</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                <Button variant="outline-light">Signup</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* Routes */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      <FormComponent
        isFormVisible={isFormVisible}
        toggleFormVisibility={setIsFormVisible}
      />
    </Router>
  );
}

export default App;

