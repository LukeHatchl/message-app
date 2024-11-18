const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json()) // Enable JSON parsing for incoming requests

let messageHistory = ["Hello from the Node.js server!"]; // Initial message history

// Endpoint that sends the current message
app.get('/api/message', (req, res) => {
    res.json({ message: messageHistory });
});

// POST endpoint to update the message
app.post('/api/message', (req, res) => {
    const { newMessage } = req.body;
    if (newMessage) {
      messageHistory.push(newMessage); // Update the message data
      res.json({ message: "Message added successfully!" });
    } else {
      res.status(400).json({ error: "Message text is required" });
    }
  });  

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });