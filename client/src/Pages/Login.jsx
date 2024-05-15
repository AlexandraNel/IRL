import Logon from "../Components/Logon";
import Signup from "../Components/SignUp";
import { Col, Row } from "react-bootstrap";
import "./Login.css";

const Login = () => {
  return (
    <>
      <Row className="loginComponent signInText">
        <Col>
          <Logon />
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

export default Login;
