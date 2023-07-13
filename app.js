const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Set the content type to 'text/html'
  res.setHeader('Content-Type', 'text/html');

  // Read the HTML file
  fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    } else {
      res.statusCode = 200;
      res.end(data);
    }
  });
});

const port = 8000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
