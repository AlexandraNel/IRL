import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types"; // Import PropTypes
import "./Footer.css";

const taglines = [
  "SWIPE RIGHT ON REAL LIFE, BECAUSE YOUR SCREEN IS TOO SMALL FOR THEIR PERSONALITY",
  "DITCH THE SMALL TALK AND FIND SOMEBODY WORTH SHOUTING OVER THE BAND FOR",
  "BECAUSE AWKWARD FIRST DATES SHOULD AT LEAST COME WITH A GOOD STORY",
  "SWAP PIXELS FOR PANCAKES. REAL LIFE IS WAITING",
  "SPICE UP YOUR SOCIAL LIFE, REAL CONNECTION, REAL LIFE",
  "FOR THOSE WHO PREFER FACE-TO-FACE TO FACETIME",
];

// passing the currentPath arg in from app
const Footer = ({ currentPath }) => {
  const [tagline, setTagline] = useState(taglines[0]);

  useEffect(() => {
    switch (currentPath) {
      case "/login":
        setTagline(taglines[1]);
        break;

      case "/chat":
        setTagline(taglines[2]);
        break;

      case "/myprofile":
        setTagline(taglines[3]);
        break;

      case "/matches":
        setTagline(taglines[4]);
        break;

      case "/discover":
        setTagline(taglines[5]);
        break;
      default:
        setTagline(taglines[0]);
    }
  }, [currentPath]);

  return (
    <Container fluid className="p-0">
    
      <Row className="footer">

        <Col xs={12} md={8} className="footerText">        
          <h4> {tagline}</h4>
        </Col>

        <Col xs={12} md={4} className="footerLink">
          <h4 > Contact: support@IRL.com </h4>
        </Col>

      </Row>
      
    </Container>
  );
};

Footer.propTypes = {
  currentPath: PropTypes.string.isRequired, // Define the type of currentPath prop
};

export default Footer;
