const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files from the browser directory
const browserDist = path.join(__dirname, 'dist/cms/browser');
app.use(express.static(browserDist));

// Check if files exist (for debugging)
console.log('Checking if files exist...');
console.log('Index.html exists:', fs.existsSync(path.join(browserDist, '')));
console.log('Server files exist:', fs.existsSync(path.join(__dirname, 'dist/cms/server/server.mjs')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.sendFile(path.join(browserDist, 'index.html'), {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  // console.log('Browser files served from:', browserDist);
});