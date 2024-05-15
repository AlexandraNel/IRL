import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from 'react';
import Auth from '../../Utils/auth';

function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation and submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Form>
      <Form.Group className="formTitle">
        <Form.Label className="form-title">Login</Form.Label>
      </Form.Group>

      <Form.Group className="mb-3 " controlId="formLoginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Text className="text-muted">Required.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-5" controlId="formLoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button className="custom-button" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Logon;
