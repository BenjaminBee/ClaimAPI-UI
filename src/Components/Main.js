import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import '../styling/main.css'
import { FaCogs, FaStopwatch, FaUnlockAlt, FaUser, FaInfoCircle } from "react-icons/fa";

export default function Main() {
  return (
    <Container className="box-container">
      <Row>
        <Col className="col">
          <h3>What is car insurance and why do I need it?</h3>
          <p disabled>Car insurance could cover your costs if your car is damaged in an accident, stolen, 
            vandalised or catches fire. You’re legally required to have insurance if you own or drive a car, 
            unless you officially declare your car off the road with a SORN (Statutory Off Road Notification). 
            You can be fined a minimum of £300 and given six penalty points if you’re caught driving without car 
            insurance. And if you end up in court, you face an unlimited fine and could be disqualified from driving.
            The type of car insurance you need depends on the level of cover you want.</p>
        </Col>
      </Row>
      <Row>
        <Col className="col">
          <Row>
            <h3>What do I need to get a quick insurance quote ?</h3>
            <Col sm>
              <ListGroup variant="flush" className="listGroups">
                <h5>Vehicle information</h5>
                <FaInfoCircle className="reactIcon"/>
                <ListGroup.Item disabled>Your vehicle's registration number</ListGroup.Item>
                <ListGroup.Item disabled>Your vehicle's make</ListGroup.Item>
                <ListGroup.Item disabled>Your vehicle's model</ListGroup.Item>
                <ListGroup.Item disabled>Your vehicle's age</ListGroup.Item>
                <ListGroup.Item disabled>Your vehicle's value</ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm className="innerColList">
              <ListGroup variant="flush" className="listGroups">
                <h5>Personal details</h5>
                <FaUser className="reactIcon"/>
                <ListGroup.Item disabled>
                  You will be required to create an account to gather a quote and save your claims.
                  You will need to provide a valid username, email and password for this process.
                </ListGroup.Item>
                <ListGroup.Item disabled>
                  You will also need to provide your insurance number and VIN number (Vehicle Identification
                  Number) when attempting to register your claim.
                </ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="col">
          <Row>
            <h3>Why use our service ?</h3>
            <Col className="advantages">
              <FaCogs className="reactIcon"/>
              <h5>Automated Quotes</h5>
              <p>We automatically generate a quote based on your details</p>
            </Col>
            <Col className="advantages">
              <FaStopwatch className="reactIcon"/>
              <h5>Find a quote quickly</h5>
              <p>Get a quote in just 2 minutes</p>
            </Col>
            <Col className="advantages">
              <FaUnlockAlt className="reactIcon"/>
              <h5>Easy access</h5>
              <p>You can check your claims and previously made quotes at the click of a button</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="col">
          <Row>
            <h3 className='expertTitle'>What our insurance expert says</h3>
            <Col className='quote'>
              <p>"With rising bills and costs across the UK, it’s never been more important to make savings 
                where you can. If you’ve had a renewal offer from your current insurer, don’t just accept it before 
                you’ve done your own research. You might find a cheaper price with a different insurer.
                Comparing quotes is the easiest way to do this, and it only takes a few minutes."
              </p>
              <p className='portraitName'>Daniel Green</p>
              <p className='portraitTitle'>Car Insurance Expert</p>
              <br></br>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}