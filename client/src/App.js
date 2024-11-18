import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  // Fetch current message from Node server
  useEffect(() => {
    fetch('http://localhost:5001/api/message')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Fetch message history from server
  useEffect(() => {
    fetch('http://localhost:5001/api/messages')
      .then(response => response.json())
      .then(data => setMessageHistory(data.messages))
      .catch(error => console.error("Error fetching message history:", error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on submit

    fetch('http://localhost:5001/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newMessage }),
    })
      .then(response => response.json())
      .then(() => {
        setMessage(newMessage); // Update the displayed message
        setMessageHistory([...messageHistory, newMessage]); // Update the message history
        setNewMessage(''); // Clear the input field
      })
      .catch(error => console.error("Error updating message:", error));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{message || "Loading..."}</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter a new message"
        />
        <button type="submit">Update Message</button>
      </form>

      <h2>Message History:</h2>
      <ul>
        {messageHistory.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;