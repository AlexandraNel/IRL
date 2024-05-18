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

  const [addEvent, { error }] = useMutation(ADD_EVENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const user = Auth.getProfile().data;

    try {
      const mutationResponse = await addEvent({
        variables: {
          name: formState.name,
          description: formState.description,
          creator: user._id,
          dateRange: formState.dateRange,
          createdAt: new Date().toISOString().substring(0, 10), // Set the current date and time
        },
      });

      if (mutationResponse) {
        console.log("Event created successfully");

        // Reset formState to initial empty values at submit
        setFormState({
          name: '',
          description: '',
          dateRange: '',
        });
      }
    } catch (e) {
      console.error("Error creating event:", e);
    }
  };

  // manages the state as user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formEventName">
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEventDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter event description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEventDateRange">
        <Form.Label>Date Range</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event date range"
          name="dateRange"
          value={formState.dateRange}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Event
      </Button>

      {error && <p className="text-danger">Error creating event: {error.message}</p>}
    </Form>
  );
}

export default Event;
