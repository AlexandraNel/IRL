// Importing necessary React hooks and the socket.io-client library
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Establishing a connection to the server at the specified URL
const socket = io('http://localhost:3001');  // Connects to your Socket.IO server (make sure the URL matches your server setup)


function Chat({ currentUser }) {
 
  const [messages, setMessages] = useState([]); //array of chat messages
  // State 'input' to keep track of the user's input in the text field
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


  // Function to send messages to the server
  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        senderId:  currentUser._id,
        receiverId: 

      }
    }
    
    // Emit a 'message' event to the server with the current input value
    socket.emit('message', input);
    // Clear the input field after sending the message
    setInput('');
  };

  // Render function that returns the UI for the chat component
  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)} // Update the input state on every change in the input field
        placeholder="Type your message here..."
      />
      {/* // Button to send the message */}
      <button onClick={sendMessage}>Send</button>  
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>  // Display each message in a new paragraph
      ))}
    </div>
  );
}

export default Chat;  // Export the Chat component for use in other parts of the app
