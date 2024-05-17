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
    creator: String!
    dateRange: String 
    createdAt: String  

  }
 
  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    events(username: String!): [Event]    
    event(eventId: ID!): Event
    prompt(promptId: ID!): Prompt
  }

  input PromptInput {
    promptText: String!
    promptAnswer: String!
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
      prompts: [PromptInput]
    ): Auth

    login(email: String!, password: String!): Auth

    addEvent(
      name: String!
      description: String!
      creator: String!
      dateRange:String
    ): Event

    removeEvent(eventId: ID!): Event
     

  
  }
`;
module.exports = typeDefs;