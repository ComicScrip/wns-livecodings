const datasource = require('../db');
const Wilder = require('../entity/Wilder');

module.exports = {
  create: (req, res) => {
    datasource
      .getRepository(Wilder)
      .save(req.body)
      .then(() => {
        res.send('wilder created');
      })
      .catch(() => {
        res.send('error while creating wilder');
      });
  },
  read: (req, res) => {
    datasource
      .getRepository(Wilder)
      .find()
      .then((wilders) => {
        res.send(wilders);
      })
      .catch(() => {
        res.send('error while reading wilders');
      });
  },
  update: (req, res) => {
    datasource
      .getRepository(Wilder)
      .update(req.body.id, req.body)
      .then(() => {
        res.send('wilder updated');
      })
      .catch(() => {
        res.send('error while updating wilder');
      });
  },
  delete: (req, res) => {
    datasource
      .getRepository(Wilder)
      .delete(req.body.id)
      .then(() => {
        res.send('wilder deleted');
      })
      .catch(() => {
        res.send('error while deleting wilder');
      });
  },
};
