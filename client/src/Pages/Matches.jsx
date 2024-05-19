import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MATCHER_MATCHES, QUERY_CREATOR_MATCHES } from "../../Utils/queries";
import { DELETE_MATCH } from "../../Utils/useMutations";
import Auth from "../../Utils/auth";
import { useEffect, useState } from 'react';
import '../Components/EventCard.css'

const Matches = () => {
  // Get user data from Auth
  const user = Auth.getProfile().data;

  // Fetch matcher matches data for the user using QUERY_MATCHER_MATCHES
  const { loading: matcherLoading, data: matcherData, error: matcherError } = useQuery(QUERY_MATCHER_MATCHES, {
    variables: { userId: user._id },
    onError: (err) => console.error('Matcher query error:', err),
  });

  // Fetch creator matches data for the user using QUERY_CREATOR_MATCHES
  const { loading: creatorLoading, data: creatorData, error: creatorError } = useQuery(QUERY_CREATOR_MATCHES, {
    variables: { userId: user._id },
    onError: (err) => console.error('Creator query error:', err),
  });

  // Set matches from query data when it's available
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    if (matcherData && matcherData.matcherMatches) {
      setMatches(matcherData.matcherMatches);
    }
    if (creatorData && creatorData.creatorMatches) {
      setMatches(prevMatches => [...prevMatches, ...creatorData.creatorMatches]);
    }
  }, [matcherData, creatorData]);

  // Initialize mutation hooks
  const [deleteMatch] = useMutation(DELETE_MATCH);

  // Handle delete match mutation
  const handleDelete = async (matchId) => {
    try {
      await deleteMatch({ variables: { matchId } });
      alert("Match deleted successfully!");
      setMatches(matches.filter(match => match._id !== matchId));
    } catch (err) {
      console.error("Error deleting match:", err);
    }
  };

  // Handle loading and error states
  if (matcherLoading || creatorLoading) return <p>Loading...</p>;
  if (matcherError) return <p>Error fetching matcher matches: {matcherError.message}</p>;
  if (creatorError) return <p>Error fetching creator matches: {creatorError.message}</p>;

  const matcherImg = matcherData?.profileImage;
  const eventCreatorImg = creatorData?.profileImage;

  // If no matches found
  if (matches.length === 0) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>No Matches Found</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  // Render matches
  return (
    <Container className = "eventCardContainer">
      <Row>
        {matches.map((match) => (
          match.eventId && (
            <Col key={match._id} sm={12} md={6} lg={4}>
              <Card className="eventCard m-5">
                <Card.Body className="eventCard">
                  <Row className="mb-3">
                    <Col sm={4}>
                      <Image
                        src={matcherImg}
                        alt={match.eventId.creator.username}
                        thumbnail
                       
                      />
                    </Col>
                    <Col sm={8}>
                      <Card.Title className="eventTitle">{match.eventId.name}</Card.Title>
                    </Col>
                  </Row>
                  <Card.Title>Vibe Setter:</Card.Title>
                  <Card.Text>{match.eventId.creator.username}</Card.Text>
                  <Card.Title>Contact:</Card.Title>
                  <Card.Text>{match.eventId.creator.email}</Card.Text>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <Image
                        src={eventCreatorImg}
                        alt={match.matcherId.username}
                        thumbnail
                        
                      />
                    </Col>
                    <Col sm={8}>
                      <Card.Title className="eventTitle">{match.eventId.name}</Card.Title>
                    </Col>
                  </Row>
                  <Card.Title>Vibe Matched:</Card.Title>
                  <Card.Text>{match.matcherId.username}</Card.Text>
                  <Card.Title>Contact:</Card.Title>
                  <Card.Text>{match.matcherId.email}</Card.Text>
                  <Row className="card-content">
                    <Card.Title>Mingle Window:</Card.Title>
                    <Card.Text>{match.eventId.dateRange}</Card.Text>
                    <Card.Title>Event Deets:</Card.Title>
                    <Card.Text>{match.eventId.description}</Card.Text>
                    <Card.Title>Opportunity Launched:</Card.Title>
                    <Card.Text>{new Date(match.eventId.createdAt).toLocaleDateString("en-GB")}</Card.Text>
                  </Row>
                  <Button
                    className = "custom-delete"
                    onClick={() => handleDelete(match._id)}
                  >
                    Delete Match
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        ))}
      </Row>
    </Container>
  );
};

export default Matches;
