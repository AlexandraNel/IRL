import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ImageUploadModal = ({ show, handleClose, handleImages, initialProfileImage = null, initialImages = [] }) => {

  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [images, setImages] = useState(initialImages);

  const handleProfileImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 5) {
      alert('You can only upload up to 5 images.');
      return;
    }
    setImages([...images, ...files]);
  };

  const handleSave = () => {
    handleImages(profileImage, images);
    handleClose();
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (

    <Modal show={show} onHide={handleClose}>

{/* If images exist edit images */}
      <Modal.Header closeButton>
        <Modal.Title>{initialProfileImage || initialImages.length ? 'Edit Images' : 'Upload Images'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="formProfileImage">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleProfileImageChange} />
          {profileImage && <img src={URL.createObjectURL(profileImage)} alt="Profile" style={{ width: '100px', marginTop: '10px' }} />}
        </Form.Group>

        <Form.Group controlId="formAdditionalImages">
          <Form.Label>Additional Images (up to 5)</Form.Label>
          <Form.Control type="file" accept="image/*" multiple onChange={handleImagesChange} />
          <div className="mt-2">
            {images.map((image, index) => (
              <div key={index} style={{ display: 'inline-block', position: 'relative', margin: '5px' }}>
                <img src={URL.createObjectURL(image)} alt={`img-${index}`} style={{ width: '100px' }} />
                <Button variant="danger" size="sm" onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', top: '0', right: '0' }}>x</Button>
              </div>
            ))}
          </div>
        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

ImageUploadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleImages: PropTypes.func.isRequired,
  initialProfileImage: PropTypes.object,
  initialImages: PropTypes.arrayOf(PropTypes.object)
};

export default ImageUploadModal;
