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
};
