const express = require('express');
const typeorm = require('typeorm');
const Wilder = require('./entity/Wilder');

const datasource = new typeorm.DataSource({
  type: 'sqlite',
  database: './wildersdb.sqlite',
  synchronize: true,
  entities: [Wilder],
});

const app = express();

app.get('/hello', (req, res) => {
  console.log('hello');
  res.send('hello !');
});

const start = async () => {
  await datasource.initialize();
  datasource.getRepository(Wilder).save({ name: 'First Wilder' });

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

start();
