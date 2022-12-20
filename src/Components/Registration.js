import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styling/main.css'

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const registerReq = async (formData) => {
    console.log("hello");
    await fetch('/user/register', {
       method: 'POST',
       body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
    })
       .then((response) => response.json())
       .then((response) => {
          if(response.ok) {
            console.log("Registered Successfully");
            return true;
          }
          else {
            console.log(false);
            return false;
          }
       })
       .catch((err) => {
          console.log(err.message);
       });
 };

  function handleSubmit(event) {
    event.preventDefault()
    if(registerReq(formData)) {
      navigate('/Login');
    } else {
      navigate('/Registration')
    }
  } 

  function handleChange(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
    }))
  }

  return (
    <Container className="box-container">
      <Row>
        <Col className="col">
          <h2>Register</h2>
        </Col>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              name="username" 
              onChange={handleChange} 
              value={formData.username} 
              placeholder="Username" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              name="email" 
              onChange={handleChange} 
              value={formData.email} 
              placeholder="Email" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              onChange={handleChange} 
              value={formData.password} 
              placeholder="Password" 
            />
          </Form.Group>
          <Button className="button" onClick={(event) => handleSubmit(event)} variant="dark" type="submit">
            Register
          </Button>
        </Form>
      </Row>
    </Container>
  );
}