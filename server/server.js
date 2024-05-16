const express = require('express');
const { createServer } = require('http');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// const { Server } = require("socket.io");

// Create an HTTP server instance
const httpServer = createServer(app);

// // Create a new instance of Socket.IO and attach it to the HTTP server
// const io = new Server(httpServer);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // // Handle Socket.IO connections
  // io.on('connection', (socket) => {
  //   console.log('A user connected via Socket.IO');

  //   // Example of handling a simple chat message
  //   socket.on('chat message', (msg) => {
  //     io.emit('chat message', msg);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('User disconnected');
  //   });
  // });
  
// if server hangs this code is a mongoose call db.once if db call succeeds server gets called 
  db.once('open', () => {
    // Make sure to use httpServer here, not app.listen
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
