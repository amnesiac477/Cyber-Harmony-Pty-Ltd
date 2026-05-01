const express = require('express');
const path = require('path');

const app = express();

// Hostinger injects PORT via environment variable - this is critical
const PORT = process.env.PORT || 3000;

// Serve all static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback: serve index.html for any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Bind to 0.0.0.0 so Hostinger's proxy can reach it (not just localhost)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cyber Harmony running on port ${PORT}`);
});
