import { getByDisplayValue } from '@testing-library/dom';
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styling/main.css'
import { getID } from '../jwtDetails';

export default function Quotes() {
  const [formData, setFormData] = React.useState({
    vehicleID: ""
  });

  const quoteReq = async (formData) => {
    const jwt = localStorage.getItem("jwt")
    await fetch('/quote/requestQuote', {
       method: 'POST',
       body: JSON.stringify({
         userID : getID(),
         vehicleID: formData.vehicleID,
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
       })
       .catch((err) => {
          console.log(err.message);
       });
 };

  function handleSubmit(event) {
    event.preventDefault()
    quoteReq(formData);
  } 

  return (
    <Container className="box-container">
      <Row>
        <Col className="col">
          <h2>Quotes</h2>
        </Col>
        <Form>
          <Button className="button" onClick={handleSubmit} variant="dark" type="button">
            Register
          </Button>
        </Form>
      </Row>
    </Container>
  );
}