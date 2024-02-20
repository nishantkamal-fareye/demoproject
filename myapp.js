const express = require('express');
const app = express();
const port = 9000;

app.listen(port, () => {
  console.log('Server listening at http://localhost:${port}');
});

app.get('/hello_world', (req, res) => {
  res.send('Hello World');
});
