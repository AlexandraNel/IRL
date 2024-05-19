import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MATCHER_MATCHES, QUERY_CREATOR_MATCHES } from "../../Utils/queries";
import { DELETE_MATCH, ACCEPT_MATCH } from "../../Utils/useMutations";
import Auth from "../../Utils/auth";
import { useEffect, useState } from 'react';

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
  const [acceptMatch] = useMutation(ACCEPT_MATCH);

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

  // Handle accept match mutation
  const handleAccept = async (matchId) => {
    try {
      await acceptMatch({ variables: { matchId } });
      alert("Match accepted successfully!");
      setMatches(matches.map(match => match._id === matchId ? { ...match, status: 'accepted' } : match));
    } catch (err) {
      console.error("Error accepting match:", err);
    }
  };

  // Handle loading and error states
  if (matcherLoading || creatorLoading) return <p>Loading...</p>;
  if (matcherError) return <p>Error fetching matcher matches: {matcherError.message}</p>;
  if (creatorError) return <p>Error fetching creator matches: {creatorError.message}</p>;

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
    <Container>
      <Row>
        {matches.map((match) => (
          match.eventId && (
            <Col key={match._id} sm={12} md={6} lg={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{match.eventId.name}</Card.Title>
                  <Card.Text>{match.eventId.description}</Card.Text>
                  <Card.Text>
                    Creator: {match.eventId.creator?.username || 'Unknown'}
                  </Card.Text>
                  <Card.Text>
                    Matcher: {match.matcherId?.username || 'Unknown'}
                  </Card.Text>
                  <Card.Text>Date Range: {match.eventId.dateRange}</Card.Text>
                  <Card.Text>
                    Created At:{" "}
                    {new Date(match.eventId.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                  </Card.Text>
                  {match.status === 'pending' && (
                    <Button
                      variant="success"
                      onClick={() => handleAccept(match._id)}
                    >
                      Accept Match
                    </Button>
                  )}
                  <Button
                    variant="danger"
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
