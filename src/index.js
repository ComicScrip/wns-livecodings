const express = require('express');
const wildersController = require('./controller/wilders');

const datasource = require('./db');

const app = express();

app.use(express.json());

app.post('/wilders', wildersController.create);
app.get('/wilders', wildersController.read);
app.patch('/wilders/:id', wildersController.update);
app.delete('/wilders/:id', wildersController.delete);

const start = async () => {
  await datasource.initialize();

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

start();
