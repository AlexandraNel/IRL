
import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';


const EventCard = ({ event, handleMatch, handleDelete, showDeleteButton }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // 'en-GB' formats the date to dd/mm/yyyy
  };

  const { creator } = event;
  if (!creator) {
    console.log('Event creator is undefined:', event);
    return null; // or return a placeholder component
  }

  return (
    <Container className="eventCardContainer">
      <Card className="eventCard">
        <Card.Body className="d-flex flex-column">
          <Row className="mb-3">
            <Col sm={2}>
              <Image
                src={creator.profileImage}
                alt={creator.username}
                roundedCircle
                width={50}
                height={50}
                className="me-3"
              />
            </Col>
            <Col sm={10} className="d-flex justify-content-center align-items-center">
              <Card.Title>{event.name}</Card.Title>
            </Col>
          </Row>
          <Card.Text className="card-content">
            <h5>Vibe Setter:</h5> {creator.username}
          </Card.Text>
          <Card.Text>
            <h5>Mingle Window:</h5> {event.dateRange}
          </Card.Text>
          <Card.Text>
          <h5>Event Deets:</h5>{event.description}
          </Card.Text>
          <Card.Text>
            <h6>Opportunity Launched:</h6> {formatDate(event.createdAt)}
          </Card.Text>
          <div className="card-buttons mt-auto">
            <Button className="custom-button" onClick={() => handleMatch(event._id)}>Match</Button>
            {showDeleteButton && <Button variant="danger" onClick={() => handleDelete(event._id)}>Delete</Button>}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      username: PropTypes.string,
      profileImage: PropTypes.string,
    }),
    dateRange: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  handleMatch: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  showDeleteButton: PropTypes.bool.isRequired,
};

export default EventCard;
