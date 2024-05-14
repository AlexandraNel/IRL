import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./join.css";

const JoinForm = () => {
    return (
      <Container fluid className="bgBlue">
        <Row className="joinRow justify-content-end">
          <Col xs={12} sm={10} md={8} lg={6} className="whiteBox">
            <Row className="align-items-center">
              <Col className="textCol">
                <h1 className="textBlue">LET&apos;S MEET UP</h1>
              </Col>
              <Col xs={4} className="linkCol">
                <Link as={Link} to="/login" className="joinLink">JOIN</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  };

export default JoinForm;
