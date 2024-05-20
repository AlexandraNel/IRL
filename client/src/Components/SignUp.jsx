import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import Auth from '../../Utils/auth';
import { ADD_USER } from '../../Utils/useMutations';
import axios from 'axios';

function SignUp() {
  // Original blank state of form
  const [formState, setFormState] = useState({
    username: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
    profileImage: '',
  });
  const [isUploading, setIsUploading] = useState(false);

  // Call mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  // Submitting the form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (isUploading) {
      alert('Please wait until the image upload is complete.');
      return;
    }

    // Convert birthday to correct format
    const formattedBirthday = new Date(formState.birthday).toISOString().substring(0, 10);

    try {
      // Variables entered into MongoDB model structure using mutation
      console.log("Submitting form with state:", { ...formState, birthday: formattedBirthday });
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
          birthday: formattedBirthday,
          gender: formState.gender,
          profileImage: formState.profileImage,
        },
      });

      console.log("Mutation response:", mutationResponse);

      // Security auths token
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);

      // Reset formState to initial values
      setFormState({
        username: '',
        lastName: '',
        email: '',
        password: '',
        birthday: '',
        gender: '',
        profileImage: '',
      });

      // Debugging errors
    } catch (err) {
      console.error("Error during form submission:", err);
    }
  };

  // Manages the state as user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Manages the image input with Cloudinary
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);

    try {
      const response = await axios.post('/upload', formData);
      console.log("Image upload response:", response); // Log the response
      setFormState({
        ...formState,
        profileImage: response.data.url,
      });
      setIsUploading(false);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  };

  // Form
  return (
    <Form onSubmit={handleFormSubmit}>
      {/* Title */}
      <Form.Group className="formTitle">
        <Form.Label className="form-title">Signup</Form.Label>
      </Form.Group>

      {/* First Name */}
      <Form.Group className="mb-3" controlId="formSignupUsername">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="User Name"
          value={formState.username}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Last Name */}
      <Form.Group className="mb-3" controlId="formSignupLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Email */}
      <Form.Group className="mb-3" controlId="formSignupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-muted">Required.</Form.Text>
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3" controlId="formSignupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Birthday */}
      <Form.Group className="mb-3" controlId="formSignupDob">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="birthday"
          placeholder="Date of Birth"
          value={formState.birthday}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-muted">Required.</Form.Text>
      </Form.Group>

      {/* Gender Dropdown */}
      <Form.Group className="mb-3" controlId="formSignupGender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          as="select"
          name="gender"
          value={formState.gender}
          onChange={handleChange}
        >
          <option value="" disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer Not To Say">Prefer Not To Say</option>
        </Form.Control>
      </Form.Group>

      {/* Profile Image */}
      <Form.Group className="mb-3" controlId="formSignupImages">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        {isUploading && <p>Uploading image...</p>}
      </Form.Group>

      {/* Submit Button */}
      <Button className="custom-button" type="submit" disabled={isUploading}>
        Submit
      </Button>

      {error && <p className="text-danger">{error.message}</p>}
    </Form>
  );
}

export default SignUp;
