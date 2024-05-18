import { Card, Button, Image, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './EventCard.css';

const EventCard = ({ event, handleMatch, handleDelete, showDeleteButton, handleProfileClick, currentUserId }) => {

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
        <Card.Body>
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
            <Col sm={10}>
              <Card.Title className="eventTitle">{event.name}</Card.Title>
            </Col>
          </Row>

          <Row className="card-content">
            <Card.Title>Vibe Setter:</Card.Title>
            <Card.Text>{creator.username}</Card.Text>
            <Card.Title>Mingle Window:</Card.Title>
            <Card.Text>{event.dateRange}</Card.Text>
            <Card.Title>Event Deets:</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Card.Title>Opportunity Launched:</Card.Title>
            <Card.Text>{formatDate(event.createdAt)}</Card.Text>
          </Row>

          <Row className="card-buttons mt-auto">
            <Button className="custom-button" onClick={() => handleMatch(event._id)}>Match</Button>
            {showDeleteButton ? (
              <Button className="custom-delete" onClick={() => handleDelete(event._id)}>Delete</Button>
            ) : (
              creator._id !== currentUserId && (
                <Button
                  className="custom-button"
                  onClick={() => handleProfileClick(creator._id)}
                  style={{ cursor: 'pointer' }}
                >
                  View Profile
                </Button>
              )
            )}
          </Row>
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
      _id: PropTypes.string,
      username: PropTypes.string,
      profileImage: PropTypes.string,
    }),
    dateRange: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  handleMatch: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  showDeleteButton: PropTypes.bool.isRequired,
  handleProfileClick: PropTypes.func, // Make this optional
  currentUserId: PropTypes.string.isRequired,
};

export default EventCard;
