import Login from "../Components/Login";
import Signup from "../Components/SignUp";
import { Col, Row } from "react-bootstrap";
import "./Login.css";

const LoginPage = () => {
  return (
    <>
      <Row className="loginComponent signInText">
        <Col>
          <Login />
        </Col>
      </Row>

      <Row className="signupComponent signInText">
        <Col>
          <Signup />
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
