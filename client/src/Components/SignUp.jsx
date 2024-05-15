import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../Utils/auth';
import { ADD_USER } from '../../Utils/useMutations';
import LocationSearchInput from './LocationSearchApi';
import ImageUploadModal from './ImageProcessor';


function SignUp() {

  const [formState, setFormState] = useState({ 
    firstName: '', 
    email: '', 
    password: '', 
    birthday: '', 
    location: '', 
    profileImage: null,
    images:[], 
    prompt: [] });

  const [showModal, setShowModal] = useState(false);
  const [addUser] = useMutation(ADD_USER);

 
  // FORM SUBMIT HANDLER
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mutationResponse = await addUser({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
        birthday: formState.dob,
        gender: formState.gender,
        height: formState.height,
        location: formState.location,
        job: formState.job,
        profileImage: formState.profileImage,
        images: formState.images,
        prompts: formState.prompts
      },
    });

    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // height regex to handle validation 
        if (name === 'height') {
      const validHeight = /^(\d{1,2}'\d{1,2}"|\d{2,3}cm)$/;
      if (!validHeight.test(value)) {
        alert('Please enter height in the format 5\'6" or 166cm');
        return;
      }
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };


  //using component modal to handle image uploads etc
    const handleImages = (profileImage, images) => {
      setFormState({
        ...formState,
        profileImage,
        images
      });
    };


  return (

     <Form onSubmit={ handleFormSubmit }>

{/* //Title */}
       <Form.Group className="formTitle">
        <Form.Label className="form-title">Signup</Form.Label>
      </Form.Group>

{/* //FirstName */}

      <Form.Group className="mb-3" controlId="formSignupFirstName">
        <Form.Label>First Name</Form.Label>
         <Form.Control
          type="text"
          placeholder="First Name"
          value={formState.firstName}
          onChange= {handleChange}
          required
        />
      </Form.Group>

{/* //LastName */}

      <Form.Group className="mb-3" controlId="formSignupLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          value= {formState.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>

{/* //Email */}

      <Form.Group className="mb-3" controlId="formSignupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-muted">
        Required.
        </Form.Text>
      </Form.Group>

{/* //Password */}

      <Form.Group className="mb-3" controlId="formSignupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        value= {formState.password}
        placeholder="Password"
        onChange={handleChange}
        required
        />
      </Form.Group>

{/* //Birthday */}

      <Form.Group className="mb-3" controlId="formSignupDob">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control 
        type="date" 
        value= {formState.dob}
        placeholder="Date of Birth" 
        onChange={handleChange}
        required
        />
        <Form.Text className="text-muted">
        Required.
        </Form.Text>
      </Form.Group>

{/* //Gender Dropdown */}

      <Form.Group className="mb-3" controlId="formSignupGender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          as="select"
          value={formState.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer Not To Say">Prefer Not To Say</option>
        </Form.Control>
      </Form.Group>

{/* //Height */}

      <Form.Group className="mb-3" controlId="formSignupHeight">
        <Form.Label>Height</Form.Label>
        <Form.Control 
        type="text" 
        value= {formState.height}
        placeholder="Height either in inches or cm"
        onChange={handleChange}
        required
        />
      </Form.Group>

{/* //Location Google Api Autocomplete */}

      <Form.Group className="mb-3" controlId="formSignupLocation">
        <Form.Label>Location</Form.Label>
        <LocationSearchInput 
        location={formState.location}
        setLocation={(location) => setFormState({ ...formState, location })}
        />        
      </Form.Group>

{/* //Job */}

      <Form.Group className="mb-3" controlId="formSignupHeight">
        <Form.Label>Profession</Form.Label>
        <Form.Control 
        type="text" 
        value= {formState.job}
        placeholder="Profession" 
        onChange={handleChange}
        required
        />
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



export default SignUp;

