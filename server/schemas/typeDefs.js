const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  scalar DateTime

  type User {
    _id: ID!
    username: String!
    lastName: String
    email: String!
    password: String!
    birthday: Date!
    gender: String
    profileImage: String
    events: [Event]
  }

  type Event {
    _id: ID!
    name: String!
    description: String!
    creator: User!
    dateRange: String
    createdAt: Date
  }
 

  type Match {
    _id: ID!
    eventId: Event!
    creatorId: User!
    matcherId: User!
    status: String!
    createdAt: Date
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    events: [Event]
    event(eventId: ID!): Event
    matches(eventId: ID!): [Match]
    userMatches(userId: ID!): [Match]
  }

  type Mutation {
    addUser(
      username: String!
      lastName: String
      email: String!
      password: String!
      birthday: Date!
      gender: String
      profileImage: String
    ): Auth

    login(email: String!, password: String!): Auth

    updateUser(
      id: ID!,
      username: String!,
      lastName: String,
      email: String!,
      birthday: Date!,
      gender: String,
      profileImage: String
    ): User

    addEvent(
      name: String!
      description: String!
      creator: ID!
      dateRange: String
      createdAt: Date
    ): Event

    removeEvent(eventId: ID!): Event
  
  createMatch(eventId: ID!, matcherId: ID!): Match
  acceptMatch(matchId: ID!): Match
  deleteMatch(matchId: ID!): Match
}
`;

module.exports = typeDefs;
