import { useEffect, useState } from 'react';
import { Container, Image, Row, Col, Card } from 'react-bootstrap';
import Auth from '../../Utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_EVENTS } from '../../Utils/queries';
import { DELETE_EVENT } from '../../Utils/useMutations'
import EventCard from '../Components/EventCard';
import './MyProfile.css'

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
  
  const { loading: eventsLoading, data: eventsData, error: eventsError } = useQuery(QUERY_EVENTS);

  const [deleteEvent] = useMutation(DELETE_EVENT);

    // use effect hook for geting events data from user model/object
    useEffect(() => {
      if (eventsData && eventsData.events) {
        const filteredEvents = eventsData.events.filter(event => event.creator._id === user?._id);
      setEvents(filteredEvents);
    }
  }, [eventsData, user]);
  
  if (loading || eventsLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (eventsError) return <p>Error: {eventsError.message}</p>;

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

    <Container className= "profilePage">
        
        <Row>
          <Col>
            <h1>{userData?.username}</h1>
          </Col>
        </Row>
    
      <Row className= "userRow">
        <Col sm={12} md={6}>
          {userImg && <Image className ="" src={userImg} alt={`${userData?.username}'s profile`} rounded />}
        </Col>

        <Col sm={12} md={6} >
          <Card className="profileCard ">
            <Card.Title className = "profileTitle">Name: </Card.Title>
            <Card.Text>{userData?.username}, {userData?.lastName}</Card.Text>
            <Card.Title className = "profileTitle">Email:</Card.Title>
            <Card.Text> {userData?.email}</Card.Text>            
            <Card.Title className = "profileTitle">Birthday:</Card.Title>
            <Card.Text> {new Date(userData?.birthday).toLocaleDateString()}</Card.Text> 
            <Card.Title className = "profileTitle">Gender:</Card.Title>
            <Card.Text> {userData?.gender}</Card.Text>
          </Card>
        </Col>
      </Row>

      <Row className="userEventsRow">
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