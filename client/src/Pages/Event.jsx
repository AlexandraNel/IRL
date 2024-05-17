// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_EVENT } from '../../Utils/queries';

const SingleEvent = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { eventId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    // pass URL parameter
    variables: { eventId: eventId },
  });

  const event = data?.event || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (

    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {event.eventCreator} <br />

        <span style={{ fontSize: '1rem' }}>
          posted this event on {event.createdAt}
        </span>

      </h3>

      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {event.eventName}
        </blockquote>
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {event.eventDescription}
        </blockquote>
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {event.eventDateRange}
        </blockquote>
      </div>
      </div>   
   
  );
};

export default SingleEvent;
