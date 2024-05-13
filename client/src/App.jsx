// Import necessary components
import { Outlet, useLocation } from "react-router-dom"; //use location to pass to footer state
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Container, Row, Col } from 'react-bootstrap';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// using boostrap containers for accessibility corss devidec ie. mobile and desktop
// passing the location to the footer object for dynamic tag line update
function App() {

  const location = useLocation();

  return (
    <ApolloProvider client={client}>
      <SSRProvider>
      <Container fluid>
        <Row className="mb-3">
        <Col xs={12} md={8} lg={6}>
            <Nav /> 
          </Col>
        </Row>
        <Row className="flex-grow-1">
          <Col>
            <Outlet />
          </Col>
        </Row>
        <Row>
          <Col>
          <Footer currentPath={location.pathname} />
          </Col>
        </Row>
      </Container>
    </SSRProvider>
    </ApolloProvider>
  );
}

export default App;



