import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import Auth from '../../Utils/auth';


function Navigation() {

  
    if (Auth.loggedIn()) {
      return (
        <>
          <Nav className="justify-content-center" activeKey="/home bgBlue">

            <Nav.Link as={Link} to="/discover" className="WGLink" >Discover</Nav.Link>
            <Nav.Link as={Link} to="/chat" className="WGLink">Chat</Nav.Link>
          
          <Nav.Link as={Link} to="/" className="mx-auto WGLink">
            <img src="/client/src/assets/IRLlogoWht.svg" alt="IRL Logo" style={{ height: '50px' }} />
          </Nav.Link>

            <Nav.Link as={Link} to="/matches" className="WGLink">Matches</Nav.Link>
            <Nav.Link href="/" onClick={() => Auth.logout()} className="WGLink">Logout</Nav.Link>

          </Nav>
        </>
      );

    } else {
      
      return (
        
           <Nav className="justify-content-center" activeKey="/home bgBlue">

          <Nav.Link as={Link} to="/" className="mx-auto WGLink">
            <img src="/client/src/assets/IRLlogoWht.svg" alt="IRL Logo" style={{ height: '50px' }} />
          </Nav.Link>
          <Nav.Link as={Link} to="/signup" className="WGLink" >Signup</Nav.Link>
            <Nav.Link as={Link} to="/login" className="WGLink" >Login</Nav.Link>
          
          </Nav>
     
      );
    }
  }


export default Navigation;
