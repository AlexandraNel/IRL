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

export const ADD_EVENT = gql`
  mutation addEvent(
    $name: String!,
    $description: String!,
    $creator: String!,
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
      creator
      dateRange
      createdAt
    }
  }
`;

