import { useEffect, useState } from 'react';
import { Container, Image, Row, Col, Card } from 'react-bootstrap';
import Auth from '../../Utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../Utils/queries';
import { DELETE_EVENT } from '../../Utils/useMutations'
import EventCard from '../Components/EventCard';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState ([]);
 

  useEffect(() => {
    // Get the logged-in user's profile from the token
    const profile = Auth.getProfile();
    setUser(profile.data);
  }, []);

  const { loading, data, error } = useQuery(QUERY_USER, {
    variables: { userId: user ? user._id : '' },
    skip: !user, // Skip the query if user is not yet set
    onError: (err) => console.error('Query error:', err), // Log query error
  });

  const [deleteEvent] = useMutation(DELETE_EVENT);

    // use effect hook for geting events data from user model/object
    useEffect(() => {
      if (data && data.user && data.user.events) {
        console.log('Fetched user data:', data.user);
        console.log('Fetched events:', data.user.events);
        setEvents(data.user.events);
      }
    }, [data]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data?.user;
  const userImg = userData?.profileImage ? `data:image/*;base64,${userData.profileImage.split(',')[1]}` : null;

  //for deleting an event
  const handleDelete = async (eventId) => {
    try {
      await deleteEvent({
        variables: { eventId },
      });
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  return (
    <Container>
      <Row>
        <Col sm={12} md={6}>
          {userImg && <Image src={userImg} alt={`${userData?.username}'s profile`} rounded />}
        </Col>
        <Col sm={12} md={6} lg={4}>
          <Card className="mb-4">
            <Card.Title>Name: {userData?.username}, {userData?.lastName}</Card.Title>
            <Card.Title>Email: {userData?.email}</Card.Title>
            <Card.Title>Birthday: {new Date(userData?.birthday).toLocaleDateString()}</Card.Title>
            <Card.Title>Gender: {userData?.gender}</Card.Title>
          </Card>
        </Col>
      </Row>

      <Row>
        {events.length > 0 ? (
          events.map((event) => (
            <Col key={event._id} sm={12} md={6} lg={4}>
              <EventCard
                event={event}
                handleMatch={() => {}}
                handleDelete={handleDelete}
                showDeleteButton={true}
              />
            </Col>
          ))
        ) : (
          <Col>
            <h4>No events found.</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MyProfile;