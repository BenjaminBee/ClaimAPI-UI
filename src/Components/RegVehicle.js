import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styling/main.css'
import { getID } from '../jwtDetails';

export default function RegVehicle() {
  const [formData, setFormData] = React.useState({
    userID: "",
    carReg: "",
    make: "",
    model: "",
    age: 0,
    value: 0,
    yearOfRegistration: ""
  });

  function handleSubmit(event) {
    event.preventDefault()
    vehicleReq(formData);
  } 

  function handleChange(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
    }))
  }

  const vehicleReq = async (formData) => {
    const jwt = localStorage.getItem("jwt");
    await fetch('/vehicle/registerVehicle', {
       method: 'POST',
       body: JSON.stringify({
         userID : getID(),
         carReg: formData.carReg,
         make: formData.make,
         model: formData.model,
         age: formData.age,
         value: formData.value,
         yearOfRegistration: formData.yearOfRegistration
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${jwt}`,
       },
    })
       .then((response) => response.json())
       .then((response) => {
          if(response.ok) {
            return true;
          }
          return false;
       })
       .catch((err) => {
          console.log(err.message);
          return false;
       });
 };

  return (
    <Container className="box-container">
      <Row>
        <Col className="col">
          <h2>Register Vehicle</h2>
        </Col>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Vehicle Registration</Form.Label>
            <Form.Control 
              type="text" 
              name="carReg" 
              onChange={handleChange} 
              value={formData.carReg} 
              placeholder="Registration" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vehicle Make</Form.Label>
            <Form.Control 
              type="text" 
              name="make" 
              onChange={handleChange} 
              value={formData.make} 
              placeholder="Make" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vehicle Model</Form.Label>
            <Form.Control 
              type="text" 
              name="model" 
              onChange={handleChange} 
              value={formData.model} 
              placeholder="Model" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vehicle Age</Form.Label>
            <Form.Control 
              type="number" 
              name="age" 
              onChange={handleChange} 
              value={formData.age} 
              placeholder="Age" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vehicle Value</Form.Label>
            <Form.Control 
              type="number" 
              name="value" 
              onChange={handleChange} 
              value={formData.value} 
              placeholder="Value" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Year of Registration</Form.Label>
            <Form.Control 
              type="date" 
              name="yearOfRegistration" 
              onChange={handleChange} 
              value={formData.yearOfRegistration} 
              placeholder="Year of Registration" 
            />
          </Form.Group>
          <Button className="button" onClick={handleSubmit} variant="dark" type="button">
            Register
          </Button>
        </Form>
      </Row>
    </Container>
  );
}