import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Auth from "../../Utils/auth";
import "./Nav.css";
import logo from "../assets/IRLlogoGrn.svg"

const IRLlogo = logo;

function Navigation() {

  if (Auth.loggedIn()) {
    
    return (
      <>
        <Nav className="justify-content-center nav">

          <Nav.Link as={Link} to="/discover" className="navText">
            Discover
          </Nav.Link>

          <Nav.Link as={Link} to="/chat" className="navText">
            Chat
          </Nav.Link>

          <Nav.Link as={Link} to="/" className="navLogo">
            <img
              src= { IRLlogo }
              alt="IRL Logo"
              style={{ height: "50px" }}
            />
          </Nav.Link>

          <Nav.Link as={Link} to="/matches" className="navText">
            Matches
          </Nav.Link>
          <Nav.Link href="/" onClick={() => Auth.logout()} className="navText">
            Logout
          </Nav.Link>
        </Nav>
      </>
    );

  } else {

    return (
      <Nav className="justify-content-center nav">

        <Nav.Link as={Link} to="/login" className="navText">
          Signup
        </Nav.Link>

        <Nav.Link as={Link} to="/" className="navLogo">
          <img
            src= { IRLlogo }
            alt="IRL Logo"
            style={{ height: "50px" }}
          />
        </Nav.Link>

        <Nav.Link as={Link} to="/login" className="navText">
          Login
        </Nav.Link>
      </Nav>
    );
  }
}

export default Navigation;
