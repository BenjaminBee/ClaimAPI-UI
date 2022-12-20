import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import '../styling/header.css';
import { FaExclamationCircle } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();

  function loginSwitch() {
    if(localStorage.getItem("jwt") === null) {
      return <Nav.Link href="login">Login</Nav.Link>
    }
    return <Nav.Link onClick={(event) => logout(event)}>Logout</Nav.Link>
  }
  
  function logout(event) {
    localStorage.removeItem("jwt");
    navigate("/Login")
  }

  return (
    <Navbar className="navbarNav" collapseOnSelect expand="lg" fixed="top" padding="20px" variant="dark">
      <Container>
        <Navbar.Brand className="home" href="/">
          <FaExclamationCircle className='iconLogo'/>
          Pingsurance
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Account">Account</Nav.Link>
            <Nav.Link href="/VehicleDashboard">Vehicle</Nav.Link>
            <Nav.Link href="/ClaimDashboard">Claims</Nav.Link>
          </Nav>
          <Nav>
            {loginSwitch()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}