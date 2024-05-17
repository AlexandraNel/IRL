import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!,
    $lastName: String,
    $email: String!,
    $password: String!,
    $birthday: Date!,
    $gender: String,
    $profileImage: String
  ) {
    addUser(
      username: $username,
      lastName: $lastName,
      email: $email,
      password: $password,
      birthday: $birthday,
      gender: $gender,
      profileImage: $profileImage
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!,
    $username: String!,
    $lastName: String,
    $email: String!,
    $birthday: Date!,
    $gender: String,
    $profileImage: String
  ) {
    updateUser(
      id: $id,
      username: $username,
      lastName: $lastName,
      email: $email,
      birthday: $birthday,
      gender: $gender,
      profileImage: $profileImage
    ) {
      _id
      username
      lastName
      email
      birthday
      gender
      profileImage
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent(
    $name: String!,
    $description: String!,
    $creator: ID!,
    $dateRange: String!
  ) {
    addEvent(
      name: $name,
      description: $description,
      creator: $creator,
      dateRange: $dateRange
    ) {
      _id
      name
      description
      creator {
        _id
        username
      }
      dateRange
      createdAt
    }
  }
`;

export const CREATE_MATCH = gql`
  mutation createMatch(
    $eventId: ID!, 
    $matcherId: ID!
  ) {
    createMatch(
      eventId: $eventId, 
      matcherId: $matcherId
    ) {
      _id
      status
    }
  }
`;

export const ACCEPT_MATCH = gql`
  mutation acceptMatch($matchId: ID!) {
    acceptMatch(matchId: $matchId) {
      _id
      status
    }
  }
`;

export const DELETE_MATCH = gql`
  mutation deleteMatch($matchId: ID!) {
    deleteMatch(matchId: $matchId) {
      _id
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      _id
    }
  }
`;
