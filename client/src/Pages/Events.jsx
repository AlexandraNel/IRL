import { Container, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EVENTS } from '../../Utils/queries';
import { CREATE_MATCH } from '../../Utils/useMutations';
import Auth from '../../Utils/auth';
import { useState, useEffect } from 'react';
import EventForm from '../Components/EventForm';
import EventCard from '../Components/EventCard';
import './Events.css'

function Events() {
  const { loading, data, error } = useQuery(QUERY_EVENTS);
  const [createMatch] = useMutation(CREATE_MATCH);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data && data.events) {
      console.log('Fetched events:', data.events);
      setEvents(data.events);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleMatch = async (eventId) => {
    const user = Auth.getProfile().data;
    try {
      await createMatch({
        variables: { eventId, matcherId: user._id },
      });
      alert('Yaaaas, you matched! Get out there and live life!');
    } catch (err) {
      console.error('Error creating match:', err);
    }
  };

  if (events.length === 0) {
    return (
      <Container className= "eventsPage">
        <Row>
          <Col>
            <h4>Add An Event!</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <EventForm />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (

      <Container className= "eventsPage">

         <Row>
          <Col>
            <h1>Add An Event!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <EventForm />
          </Col>
        </Row>

        <Row >
          {events.map((event) => (
            <Col key={event._id} sm={12} md={6} lg={4}>
              <EventCard
                event={event}
                handleMatch={handleMatch}
                handleDelete={() => {}}
                showDeleteButton={false} // No delete button on the Events page
              />
            </Col>
          ))}
        </Row>
  
      </Container>
    );
    
  }
}

export default Events;
