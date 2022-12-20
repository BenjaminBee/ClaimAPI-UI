import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styling/main.css';
import { FaTemperatureLow } from 'react-icons/fa';
import '../jwtDetails.js';
import { getID } from '../jwtDetails.js';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    userID: "",
    username: "",
    password: "",
    status: false
  });

  function loginReq(formData) {
     fetch('/user/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      if(response.status !== 200) {
        navigate("/Login")
        alert("Details are incorrect")
        return formData.status;
      }
      response.json().then((responseJson)=>{
      localStorage.setItem('jwt', responseJson.jwt)
      formData.status = true;
      getID();
      navigate("/")
      })
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    loginReq(formData)
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  return (
    <Container className="box-container">
      <Row>
        <Col className="col">
          <h2>Login</h2>
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
            Login
          </Button>
          <Button className="button" href="/Registration" variant="dark" type="button">
            Register
          </Button>
        </Form>
      </Row>
    </Container>
  );
  }