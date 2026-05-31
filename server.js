const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Determine the correct base directory
const BASE_DIR = fs.existsSync(path.join(__dirname, 'index.html')) 
  ? __dirname 
  : process.cwd();

console.log('BASE_DIR:', BASE_DIR);
console.log('__dirname:', __dirname);
console.log('cwd:', process.cwd());
console.log('index.html exists at __dirname:', fs.existsSync(path.join(__dirname, 'index.html')));
console.log('index.html exists at cwd:', fs.existsSync(path.join(process.cwd(), 'index.html')));

// Serve static files
app.use(express.static(BASE_DIR));

// Serve index.html for all routes
app.get('*', (req, res) => {
  const indexPath = path.join(BASE_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Cyber Harmony - index.html not found at: ' + indexPath);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cyber Harmony running on port ${PORT} from ${BASE_DIR}`);
});
