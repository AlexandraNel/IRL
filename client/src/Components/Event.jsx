// export default Chat;  // Export the Chat component for use in other parts of the app
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../Utils/auth';
import { ADD_EVENT } from '../../Utils/useMutations';

function Event() {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    dateRange: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [addEvent, {error}] = useMutation(ADD_EVENT);

  // FORM SUBMIT HANDLER
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mutationResponse = await addEvent({
      variables: {
        name: formState.name,
        description: formState. description,
        dateRange: formState.dateRange,
      },
    });

    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };


  // Using component modal to handle image uploads etc.
  const handleImages = (profileImage, images) => {
    setFormState({
      ...formState,
      profileImage,
      images,
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
          <option value="NonBinary">Non-binary</option>
          <option value="PreferNotToSay">Prefer Not To Say</option>
        </Form.Control>
      </Form.Group>

{/* Height */}
      <Form.Group className="mb-3" controlId="formSignupHeight">
        <Form.Label>Height</Form.Label>
        <Form.Control
          type="text"
          name="height"
          placeholder="Height either in inches or cm"
          value={formState.height}
          onChange={handleChange}
        />
      </Form.Group>

{/* Location Google Api Autocomplete */}
      <Form.Group className="mb-3" controlId="formSignupLocation">
        <Form.Label>Location</Form.Label>
        <LocationSearchInput
          location={formState.location}
          setLocation={(location) => setFormState({ ...formState, location })}
        />
      </Form.Group>

{/* Job */}
      <Form.Group className="mb-3" controlId="formSignupJob">
        <Form.Label>Profession</Form.Label>
        <Form.Control
          type="text"
          name="job"
          placeholder="Profession"
          value={formState.job}
          onChange={handleChange}
        />
      </Form.Group>

{/* Here For Dropdown */}
         <Form.Group className="mb-3" controlId="formSignupHereFor">
        <Form.Label>Here For</Form.Label>
        <Form.Control
          as="select"
          name="hereFor"
          value={formState.hereFor}
          onChange={handleChange}
        >
          <option value="Romance" disabled>Romance</option>
          <option value="Friendship">Friendship</option>
          <option value="GroupOutings">Group Outings</option>
          <option value="Relationship">Relationship</option>
          <option value="NotSure">Not Sure</option>
        </Form.Control>
      </Form.Group>

{/* Images */}
      <Form.Group className="mb-3" controlId="formSignupImages">
        <Form.Label>Profile Image and Additional Images</Form.Label>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Upload/Edit Images
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

export default Event;
