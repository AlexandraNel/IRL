import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../Utils/auth';
import { ADD_USER } from '../../Utils/useMutations';
import ImageUploadModal from './ImageProcessor';

function SignUp() {
  const [formState, setFormState] = useState({
    username: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
    profileImage: null,
    prompts: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [addUser, {error}] = useMutation(ADD_USER);

  // FORM SUBMIT HANDLER
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try{
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
        birthday: new Date(formState.birthday).toISOString().substring(0, 10),
        gender: formState.gender,
        profileImage: formState.profileImage,       
        prompts: formState.prompts,
      },
    });

    const token = mutationResponse.data.addUser.token;
    Auth.login(token)
  }
  catch (err) {console.log(err)}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;



    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Using component modal to handle image uploads etc.
  const handleImages = (profileImage, images) => {
    setFormState({
      ...formState,
      profileImage,
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>

{/* Title */}
      <Form.Group className="formTitle">
        <Form.Label className="form-title">Signup</Form.Label>
      </Form.Group>

{/* First Name */}
      <Form.Group className="mb-3" controlId="formSignupusername">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="First Name"
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
          <option value="Non Binary">Non-binary</option>
          <option value="Prefer Not ToSay">Prefer Not To Say</option>
        </Form.Control>
      </Form.Group>

{/* ProfileImage */}
      <Form.Group className="mb-3" controlId="formSignupImages">
        <Form.Label>Profile Image</Form.Label>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Upload/Edit Image
        </Button>
      </Form.Group>

{/* Submit Button */}
      <Button className="custom-button" type="submit">
        Submit
      </Button>

{/* Image Upload/Edit Modal */}
      <ImageUploadModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleImages={handleImages}
        initialProfileImage={formState.profileImage}
        initialImages={formState.images}
      />
    </Form>
  );
}

export default SignUp;
