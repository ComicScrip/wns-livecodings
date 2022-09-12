const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
  console.log('hello');
  res.send('hello !');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
