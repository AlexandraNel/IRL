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
    profileImage: String
    prompts: [Prompt]
  }

  type Chat {
    _id: ID!
    senderId: User!
    receiverId: User!
    message: String!
    timestamp: DateTime
  }
  type Prompt {
    _id: ID!
    promptText: String!
    promptAnswer: String!
  }
 
  type Event {
    _id: ID!
    name: String!
    description: String!
    dateRange: String
    creator: User
    matches: [User]
    finalMatch: [User]

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
    prompt(_id: ID!): Prompt
  }

  input PromptInput {
    promptText: String!
    promptAnswer: String!
  }
 
  type Mutation {

    addUser(
      firstName: String!
      lastName: String
      email: String!
      password: String!
      birthday: Date!
      gender: String   
      profileImage: String
      prompts: [PromptInput]
    ): Auth

    addEvent(
      name: String!
      description: String!
      dateRange: String!
      creator: ID!
      matches: [ID]
      finalMatch: [ID]
    ): Event

    updateUser(
      firstName: String!
      lastName: String
      email: String!
      birthday: Date!
      gender: String
      profileImage: String
      prompts: [PromptInput]
    ): User

    updateEvent(
      name: String!
      description: String!
      dateRange: String!
      creator: ID!
      matches: [ID]
      finalMatch: [ID]
    ): Event
    

    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs;