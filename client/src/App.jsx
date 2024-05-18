// Import necessary components
import { Outlet, useLocation } from "react-router-dom"; //use location to pass to footer state
import Navigation from "./Components/Nav";
import Footer from "./Components/Footer";
import { Container } from "react-bootstrap";
import './index.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
      <Container fluid bsPrefix="noGutters" >
        <Navigation />

        <Outlet />

        <Footer currentPath={location.pathname} />
      </Container>
    </ApolloProvider>
  );
}

export default App;
