const express = require('express');
const wildersController = require('./controller/wilders');

const datasource = require('./db');

const app = express();

app.use(express.json());

app.post('/api/wilder', wildersController.create);

const start = async () => {
  await datasource.initialize();

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

start();
