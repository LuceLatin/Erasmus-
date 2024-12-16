import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    dateOfBirth: '',
    OIB: '',
    address: '',
    city: '',
    country: '',
    email: '',
    password: '',
    role: 'student',
    branch: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to your API endpoint to create the user
    fetch('/api/users/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirect to user list page on success
        navigate('/userlist');
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Dodaj korisnika</h1>
      <Form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <Form.Group controlId="firstName" className="mb-3">
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName" className="mb-3">
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Korisničko ime</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
            minLength={4}
          />
        </Form.Group>
        <Form.Group controlId="dateOfBirth" className="mb-3">
          <Form.Label>Datum rođenja</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="OIB" className="mb-3">
          <Form.Label>OIB</Form.Label>
          <Form.Control
            type="number"
            name="OIB"
            value={userData.OIB}
            onChange={handleChange}
            required
            minLength={11}
            maxLength={11}
          />
        </Form.Group>
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Adresa</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="city" className="mb-3">
          <Form.Label>Grad</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Država</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={userData.country}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="role" className="mb-3">
          <Form.Label>Uloga</Form.Label>
          <Form.Select
            name="role"
            value={userData.role}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            <option value="profesor">Profesor</option>
            <option value="koordinator">Koordinator</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Dodaj korisnika
        </Button>
      </Form>
    </Container>
  );
}

export default AddUser;
