const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  scalar DateTime

  type User {
    _id: ID!
    firstName: String!
    lastName: String
    email: String!
    password: String!
    birthday: Date!
    gender: String
    height: String
    location: String!
    job: String
    hereFor: String
    about: String
    profileImage: String!
    images: [String!]!
    prompts: [Prompt!]!
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
    event: Event!
    poster: User!
    responder: User!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    allUsers: [User]
    allEvents: [Event]
    user(_id: ID!): User
    event(_id: ID!): Event
    match(_id: ID!): Match
    prompt(_id: ID!): Prompt
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String
      email: String!
      password: String!
      birthday: Date!
      gender: String
      height: String
      location: String!
      job: String
      profileImage: String!
      images: [String!]!
      prompts: [Prompt!]!
    ): Auth

    addEvent(
      name: String!
      description: String!
      dateRange: DateRange!
    ): Event

    updateUser(
      firstName: String!
      lastName: String
      email: String!
      birthday: Date!
      gender: String
      height: String
      location: String!
      job: String
      profileImage: String!
      images: [String!]!
      prompts: [Prompt!]!
    ): User

    updateEvent(
      name: String!
      description: String!
      dateRange: DateRange!
    ): Event

    addMatch(
      eventId: ID!
      posterId: ID!
      responderId: ID!
    ): Match

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
