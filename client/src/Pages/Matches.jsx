import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EVENTS } from '../../Utils/queries';
import { CREATE_MATCH, DELETE_EVENT } from '../../Utils/useMutations';
import Auth from '../../Utils/auth';

const Matches = () => {
  const { loading, data, error } = useQuery(QUERY_EVENTS);
  const [createMatch] = useMutation(CREATE_MATCH);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const events = data?.events || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // 'en-GB' formats the date to dd/mm/yyyy
  };

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

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent({
        variables: { eventId },
      });
      alert('Event deleted successfully!');
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  return (
    <Container>
      <Row>
        {events.map((event) => (
          <Col key={event._id} sm={12} md={6} lg={4}>
            <Card className="mb-4">
              {event.image && <Card.Img variant="top" src={event.image} alt={event.name} />}
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>Creator: {event.creator.username}</Card.Text>
                <Card.Text>Date Range: {event.dateRange}</Card.Text>
                <Card.Text>Created At: {formatDate(event.createdAt)}</Card.Text>
                <Button variant="primary" className="me-2" onClick={() => handleMatch(event._id)}>Match</Button>
                <Button variant="danger" onClick={() => handleDelete(event._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Matches;
