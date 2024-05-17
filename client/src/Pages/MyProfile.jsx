import { useEffect, useState } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import Auth from '../../Utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../Utils/queries';

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the logged-in user's profile from the token
    const profile = Auth.getProfile();
    setUser(profile.data);
  }, []);

  const { loading, data, error } = useQuery(QUERY_USER, {
    variables: { username: user ? user.username : '' },
    skip: !user, // Skip the query if user is not yet set
    onError: (err) => console.error('Query error:', err), // Log query error
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data?.user;
  const userImg = userData?.profileImage ? `data:image/*;base64,${userData.profileImage.split(',')[1]}` : null;

  return (
    <Container>
      <Row>
        <Col>
          {userImg && <Image src={userImg} alt={`${userData?.username}'s profile`} />}
        </Col>
        <Col>
          {userData && (
            <div>
              <h2>{userData.username}</h2>
              <p>Email: {userData.email}</p>
              <p>Last Name: {userData.lastName}</p>
              <p>Birthday: {new Date(userData.birthday).toLocaleDateString()}</p>
              <p>Gender: {userData.gender}</p>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        {userData?.events && userData.events.length > 0 && (
          <Col>
            <h3>Events</h3>
            <ul>
              {userData.events.map(event => (
                <li key={event._id}>
                  <h4>{event.name}</h4>
                  <p>{event.description}</p>
                  <p>{event.dateRange}</p>
                  <p>Created At: {new Date(event.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default MyProfile;
