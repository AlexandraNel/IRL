import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Auth from '../../Utils/auth';

function Navigation() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Nav className="me-auto bgBlue">
            <Nav.Link as={Link} to="/discover" className="WGLink" >Discover</Nav.Link>
            <Nav.Link as={Link} to="/chat" className="WGLink">Chat</Nav.Link>
          </Nav>
          <Navbar.Brand as={Link} to="/" className="mx-auto WGLink">
            <img src="/client/src/assets/IRLlogoWht.svg" alt="IRL Logo" style={{ height: '50px' }} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/matches" className="WGLink">Matches</Nav.Link>
            <Nav.Link href="/" onClick={() => Auth.logout()} className="WGLink">Logout</Nav.Link>
          </Nav>
        </>
      );
    } else {
      return (
        <>
          <Nav className="ms-auto bgBlue"> 
            <Nav.Link as={Link} to="/signup" className="WGLink" >Signup</Nav.Link>
            <Nav.Link as={Link} to="/login" className="WGLink" >Login</Nav.Link>
          </Nav>
          <Navbar.Brand as={Link} to="/" className="mx-auto">
            <img src="/client/src/assets/IRLlogoWht.svg" alt="IRL Logo" style={{ height: '50px' }} />
          </Navbar.Brand>
        </>
      );
    }
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {showNavigation()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
