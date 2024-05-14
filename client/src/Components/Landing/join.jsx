import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./join.css";

const JoinForm = () => {
  return (
    <Container fluid className="bgBlue" bsPrefix="noGutters">
      <Row className="joinRow justify-content-end g-0">
        <Col xs={12} sm={8} className="whiteBox">

          <h1 className="textBlue">LET&apos;S MEET UP</h1>
        </Col>
        <Col xs={12} sm={4} className="linkCol justify-content-end">
          <Link as={Link} to="/login" className="joinLink">JOIN</Link>


        </Col>
      </Row>
    </Container>
  );
};

export default JoinForm;
