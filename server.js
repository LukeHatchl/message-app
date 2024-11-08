const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());

// Endpoint that sends a message
app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from the Node.js server!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });