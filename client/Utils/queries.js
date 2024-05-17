import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(_id: $userId) {
      _id
      username
      lastName
      email
      birthday
      gender
      profileImage
      events {
        _id
        name
        description
        dateRange
        createdAt
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query events {
    events {
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


export const QUERY_SINGLE_EVENT = gql`
  query getSingleEvent($eventId: ID!) {
    event(eventId: $eventId) {
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
