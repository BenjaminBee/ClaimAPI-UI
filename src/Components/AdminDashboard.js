import {useState, useEffect, React} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styling/main.css'

export default function AdminDashboard() {
  const [formData, setFormData] = useState({  
    userName: "",
    email: "",
    password: ""
  });

  return (
    <Container className="box-container">
      <Row>
        <Col className="col">
            <h2>Admin Dashboard</h2>
        </Col>
        <Row>
            <Col sm className="col">
                <Button className="button" href="/AdminUsers" variant="dark" type="button">
                    Users
                </Button>
            </Col>
            <Col sm className="col">
                <Button className="button" href="/AdminVehicles" variant="dark" type="button">
                    Vehicles
                </Button>
            </Col>
            <Col sm className="col">
                <Button className="button" href="/AdminClaims" variant="dark" type="button">
                    Claims
                </Button>
            </Col>
        </Row>
      </Row>
    </Container>
  );
}