
import { Container, Image, Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../Utils/queries';
import PropTypes from 'prop-types';
import '../Pages/MyProfile.css';

const MatchProfile = ({ userId, handleBack }) => {
  const { loading, data, error } = useQuery(QUERY_USER, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data?.user;
  const userImg = userData?.profileImage
    ? `data:image/*;base64,${userData.profileImage.split(",")[1]}`
    : null;

  return (
    <Container className="profilePage">
      <Row>
        <Col>
       
          <h1>{userData?.username}</h1>
        </Col>
      </Row>
      <Row className="userRow">
        <Col sm={12} md={6}>
          {userImg && (
            <Image
              className=""
              src={userImg}
              alt={`${userData?.username}'s profile`}
              rounded
            />
          )}
        </Col>
        <Col sm={12} md={6}>
          <Card className="profileCard">
            <Card.Title className="profileTitle">Name: </Card.Title>
            <Card.Text>
              {userData?.username}, {userData?.lastName}
            </Card.Text>
            <Card.Title className="profileTitle">Email:</Card.Title>
            <Card.Text> {userData?.email}</Card.Text>
            <Card.Title className="profileTitle">Birthday:</Card.Title>
            <Card.Text>
              {new Date(userData?.birthday).toLocaleDateString()}
            </Card.Text>
            <Card.Title className="profileTitle">Gender:</Card.Title>
            <Card.Text> {userData?.gender}</Card.Text>
          </Card>
        </Col>      
          </Row>
         <Row> <Button className = "custom-delete" onClick={handleBack}>Back</Button> </Row>
    </Container>
  );
};

MatchProfile.propTypes = {
    userId: PropTypes.string.isRequired,
    handleBack: PropTypes.func.isRequired,
  };
  
export default MatchProfile;
