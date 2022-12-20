import {useState, useEffect, React} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { getID } from '../jwtDetails';
import '../styling/main.css'
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({  
    username: "",
    email: "",
    password: ""
  });

  useEffect((formData) => {
    const jwt = localStorage.getItem("jwt");
    fetch('/user/getUser', {
      method: 'POST',
      body: JSON.stringify({
        userID : getID()
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${jwt}`,
     },
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setFormData(data);
          formData.username = data.username;
          formData.email = data.email;
          formData.password = data.password;
       })
       .catch((err) => {
          console.log(err.message);
       });
  },[]);

  function updateUser(formData) {
    const jwt = localStorage.getItem("jwt");
    fetch('/user/updateUser', {
     method: 'PATCH',
     body: JSON.stringify({
       userID : getID(),
       email: formData.email,
     }),
     headers: {
       'Content-type': 'application/json; charset=UTF-8',
       'Authorization': `Bearer ${jwt}`,
     },
   }).then((response) => response.json())
   .then((response) => {
      if(response.ok) {
        console.log("Updated Successfully");
        navigate("/Account")
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
    updateUser(formData)
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
          <h2>Account Details</h2>
        </Col>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              disabled
              type="text" 
              name="username" 
              value={formData.username} 
              placeholder="Username" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="text" 
              name="email" 
              onChange={handleChange}
              value={formData.email} 
              placeholder="Email" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              disabled
              type="password" 
              name="password" 
              value={formData.password} 
              placeholder="Password" 
            />
          </Form.Group>
          <Button className="button" onClick={(event) => handleSubmit(event)}  variant="dark" type="submit">
            Update Details
          </Button>
        </Form>
      </Row>
    </Container>
  );
}