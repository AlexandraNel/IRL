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
    $firstName: String,
    $lastName: String,
    $email: String!,
    $password: String!,
    $birthday: Date!,
    $gender: String,
    $height: String,
    $location: String!,
    $job: String,
    $profileImage: String!,
    $images: [String!]!,
    $prompts: [Prompt!]!
  ) {
    addUser(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,
      birthday: $birthday,
      gender: $gender,
      height: $height,
      location: $location,
      job: $job,
      profileImage: $profileImage,
      images: $images,
      prompts: $prompts
    ) {
      token
      user {
        _id
      }
    }
  }
`;
