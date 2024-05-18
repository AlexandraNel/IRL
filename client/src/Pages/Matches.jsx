import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_MATCHES } from "../../Utils/queries";
import { DELETE_MATCH } from "../../Utils/useMutations";
import Auth from "../../Utils/auth";

const Matches = () => {
  const user = Auth.getProfile().data;
  const { loading, data, error } = useQuery(QUERY_USER_MATCHES, {
    variables: { userId: user._id },
  });

  const [deleteMatch] = useMutation(DELETE_MATCH);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const matches = data?.userMatches || [];

  const handleDelete = async (matchId) => {
    try {
      await deleteMatch({ variables: { matchId } });
      alert("Match deleted successfully!");
    } catch (err) {
      console.error("Error deleting match:", err);
    }
  };

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
  } else {
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
                      Creator: {match.eventId.creator.username}
                    </Card.Text>
                    <Card.Text>Date Range: {match.eventId.dateRange}</Card.Text>
                    <Card.Text>
                      Created At:{" "}
                      {new Date(match.eventId.createdAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </Card.Text>
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
  }
};

export default Matches;
