import React from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import '../styling/main.css'
import { getID } from '../jwtDetails';

export default function RegClaim() {
  const [formData, setFormData] = React.useState({
    quoteID : "",
    vehicleID: "",
    userID : "",
    insuranceNo : "",
    vin : "",
    quoteData : "",
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
    console.log(formData);
  }

  const vehicleReq = async (formData) => {
    const jwt = localStorage.getItem("jwt");
    await fetch('/claims/regClaim', {
       method: 'POST',
       body: JSON.stringify({
         userID : getID(),
         quoteID: parseInt(formData.quoteID),
         insuranceNo : formData.insuranceNo,
         vin : formData.vin
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

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleQuote(event) {
        event.preventDefault()
        quoteReq(formData);
      } 

      const quoteReq = async (formData) => {
        const jwt = localStorage.getItem("jwt");
        await fetch('/quote/requestQuote', {
           method: 'POST',
           body: JSON.stringify({
              userID: getID(),
              vehicleID: formData.email,
           }),
           headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${jwt}`,
           },
        })
        .then((response) => response.json())
        .then((data) => {
           formData.quoteData = data;
           console.log(formData.quoteData);
        })
        .catch((err) => {
           console.log(err.message);
        });
   };

  return (
    <Container className="box-container">
      <Row>
        <Col className="col">
          <h2>Register Claim</h2>
        </Col>
        <>
        <Button variant="warning" onClick={handleShow}>
            Register new Quote
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register new Quote</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter VehicleID</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="vehicleID" 
                            onChange={handleChange} 
                            value={formData.vehicleID} 
                            placeholder="VehicleID" 
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleQuote}>
                    Register
                </Button>
            </Modal.Footer>
        </Modal>
        </>
                   
        <Form>
          <select name="quoteID" onChange={handleChange} className="form-select" aria-label="Default select example">
            <option defaultValue="0">Select Quote</option>
            <option value="1">Quote1</option>
            <option value="2">Quote2</option>
            <option value="3">Quote3</option>
          </select>
          <Form.Group className="mb-3">
            <Form.Label>InsuranceNo</Form.Label>
            <Form.Control 
              type="text" 
              name="insuranceNo" 
              onChange={handleChange} 
              value={formData.insuranceNo} 
              placeholder="InsuranceNo" 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>VIN</Form.Label>
            <Form.Control 
              type="text" 
              name="vin" 
              onChange={handleChange} 
              value={formData.vin} 
              placeholder="VIN" 
            />
          </Form.Group>
          <Button className="button" onClick={handleSubmit} variant="dark" type="button">
            Register Claim
          </Button>
        </Form>
      </Row>
    </Container>
  );
}