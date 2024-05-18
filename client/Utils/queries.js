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
        creator {
          _id  
          username
          profileImage     
        }
        dateRange
        createdAt
      }
    }
  }
`;

export const QUERY_USER_MATCHES = gql`
  query userMatches($userId: ID!) {
    userMatches(userId: $userId) {
      _id
      eventId {
        _id
        name
        description
        dateRange
        createdAt
        creator {
          _id
          username
        }
      }
      creatorId {
        _id
        username
      }
      matcherId {
        _id
        username
      }
      status
      createdAt
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
        profileImage
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
