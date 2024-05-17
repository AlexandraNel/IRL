import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      lastName
      email
      birthday
      gender
      profileImage
      events{
        _id
        name
        description
        dateRange
        createdAt
      }
      prompts{
        _id
        promptText
        promptAnswer
      }
    
    }
  }
`;
// not sure if correct syntax
export const QUERY_EVENTS = gql`
  query getEvents {
    events {
      _id
      eventName
      eventDescription
      eventCreator
      eventDateRange
      eventcreatedAt
    }
  }
`;

export const QUERY_SINGLE_EVENT = gql`
  query getSingleEvent($eventId: ID!) {
    event(eventId: $eventId) {
      _id
      eventName
      eventDescription
      eventCreator
      eventDateRange
      eventCreatedAt
    }
  }
`;
