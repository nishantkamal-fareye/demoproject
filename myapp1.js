const express = require('express');
const app = express();
const port = 9000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:9000`);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});


