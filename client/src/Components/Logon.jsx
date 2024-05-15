import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../../Utils/useMutations';
import Auth from '../utils/auth';

function Logon() {

  const [formState, setFormState] = useState({ email: '', password: '' });

  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { 
          email: formState.email, 
          password: formState.password 
        },
      });

      const token = mutationResponse.data.login.token;
      Auth.login(token);
      
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={ handleFormSubmit }>
      <Form.Group className="formTitle">
        <Form.Label className="form-title">Login</Form.Label>
      </Form.Group>

      <Form.Group className="mb-3 " controlId="formLoginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={formState.email}
          onChange= {handleChange}
          required
        />
        <Form.Text className="text-muted">Required.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-5" controlId="formLoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange= {handleChange}
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
