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
    $firstName: String!,
    $lastName: String,
    $email: String!,
    $password: String!,
    $birthday: Date!,
    $gender: String,
    $profileImage: String,
    $prompts: [PromptInput]
  ) {
    addUser(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,
      birthday: $birthday,
      gender: $gender,
      profileImage: $profileImage,
      prompts: $prompts
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
        birthday
        gender
        profileImage
         prompts {
          promptText
          promptAnswer
        }
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent(
    $name: String!,
    $description: String,
    $dateRange: String!,

) {
    addEvent(
      name: $name,
      description: $description,
      dateRange: $dateRange,
)}
   
`;
