const { DateResolver, DateTimeResolver } = require('graphql-scalars');
//to allow graphQL to take in date
// graphql-scalars for date

const typeDefs =
  `
scalar Date
scalar DateTime
  
  type User {
    _id: ID!
    firstName: String!
    lastName: String
    email: String!
    birthday: Date!
    gender: String
    height: String
    location: String!
    job: String
    images: [String!]!
    prompts:[Prompt!]!
  }

  type Chat {
   _id: ID!
   senderId: User!
   receiverId: User!
   message: String!
   timestamp: DateTime!
  }

  type Prompt {
    _id: ID!
    promptText: String!
    promptAnswer: String!
  }

  type DateRange {
    startDate: DateTime!
    endDate: DateTime!
  }
  
  type Event {
    _id: ID!
    name: String!
    description: String!
    dateRange: DateRange! 
  }

  type Match {
    _id: ID!
    eventId: Event!
    posterId: User!
    responderId: User! 
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    allUsers: [User]    
    allEvents: [Event]
    user: User
    event( _id: ID!): Event
    match( _id: ID!): Match
    prompt( _id: ID!): Prompt  
    
  }

  type Mutation {
   
  }
`;

module.exports = typeDefs;
