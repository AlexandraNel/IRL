import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../Utils/queries';


const Events = () => {
  // Fetch events data using the useQuery hook
  const { loading, data, error } = useQuery(QUERY_EVENTS);

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error: {error.message}</p>;

  // Extract events from the data
  const events = data?.events || [];
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // 'en-GB' formats the date to dd/mm/yyyy
  };

  // Render events as cards
  return (
    <Container>
      <Row>
        {events.map(event => (
          <Col key={event._id} sm={12} md={6} lg={4}>
            <Card className="mb-4">
              {/* Add event image if available */}
              {event.image && <Card.Img variant="top" src={event.image} alt={event.name} />}
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>Creator: {event.creator}</Card.Text>
                <Card.Text>Date Range: {event.dateRange}</Card.Text>
                <Card.Text>Created At:{formatDate(event.createdAt)}</Card.Text>
                <Button variant="primary" className="me-2">Match</Button>
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Events;
