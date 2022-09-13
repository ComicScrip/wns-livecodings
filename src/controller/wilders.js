const datasource = require('../db');
const Wilder = require('../entity/Wilder');

module.exports = {
  create: (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send('the name should have a length between 1 and 100 characters');
    }

    datasource
      .getRepository(Wilder)
      .save({ name })
      .then((created) => {
        res.status(201).send(created);
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
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send('the name should have a length between 1 and 100 characters');
    }

    datasource
      .getRepository(Wilder)
      .update(req.params.id, req.body)
      .then(({ affected }) => {
        if (affected) {
          res.send('wilder updated');
        } else {
          res.sendStatus(404);
        }
      })
      .catch(() => {
        res.send('error while updating wilder');
      });
  },
  delete: (req, res) => {
    datasource
      .getRepository(Wilder)
      .delete(req.params.id)
      .then(({ affected }) => {
        if (affected) res.send('wilder deleted');
        else res.sendStatus(404);
      })
      .catch(() => {
        res.send('error while deleting wilder');
      });
  },
};
