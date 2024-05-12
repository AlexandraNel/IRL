// Importing necessary React hooks and the socket.io-client library
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Establishing a connection to the server at the specified URL
const socket = io('http://localhost:3001');  // Connects to your Socket.IO server (make sure the URL matches your server setup)


function Chat({ currentUser }) {
 
  const [messages, setMessages] = useState([]); //array of chat messages

  // State 'input' to keep track of the user's input in the text field
  // standard practice with react to track input when working with the virtual DOM
  const [input, setInput] = useState('');
 
  // useEffect hook to set up and tear down the WebSocket connection
  useEffect(() => {
    // Function to handle incoming messages
    const handleMessage = (newMessage) => {
      // Update the messages state by adding the new message
      setMessages(messages => [...messages, newMessage]);
    };

    // Register the handleMessage function as a listener for 'message' events from the server
    socket.on('message', handleMessage);

    // Cleanup function to unregister the event listener when the component unmounts
    return () => {
      socket.off('message', handleMessage);
    };
  }, []);  // Empty dependency array means this effect runs once after the initial render


  // Function to send messages to the server, required db args
  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        senderId: currentUser._id, // Assuming you have the currentUser object with an _id field
        receiverId: 'receiverIdHere', // This needs to be set based on your app logic
        message: input,
        timestamp: new Date()
      };
      socket.emit('message', message);
      setMessages(messages => [...messages, message]);
      setInput('');
    }
  };
    
  // under acklowledgmenets here https://socket.io/docs/v4/
  // Render function that returns the UI for the chat component
  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === currentUser._id ? 'message-outgoing' : 'message-incoming'}`}
          >
            <p className="message-text">{msg.message}</p>
            <span className="message-timestamp">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;  // Export the Chat component for use in other parts of the app
