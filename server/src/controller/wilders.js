const datasource = require('../db');
const Skill = require('../entity/Skill');
const Wilder = require('../entity/Wilder');

module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send('the name should have a length between 1 and 100 characters');
    }

    try {
      const created = await datasource.getRepository(Wilder).save({ name });
      res.status(201).send(created);
    } catch (err) {
      console.error(err);
      res.send('error while creating wilder');
    }

    /*
    datasource
      .getRepository(Wilder)
      .save({ name })
      .then((created) => {
        res.status(201).send(created);
      })
      .catch(() => {
        res.send('error while creating wilder');
      });
      */
  },
  read: async (req, res) => {
    try {
      const wilders = await datasource.getRepository(Wilder).find();
      // const wilders = await datasource.getRepository(Wilder).query('SELECT * FROM wilder');
      res.send(wilders);
    } catch (err) {
      console.error(err);
      res.send('error while reading wilders');
    }
  },
  update: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send('the name should have a length between 1 and 100 characters');
    }

    try {
      const { affected } = await datasource
        .getRepository(Wilder)
        .update(req.params.id, req.body);
      if (affected) return res.send('wilder updated');
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.send('error while updating wilder');
    }
  },
  delete: async (req, res) => {
    try {
      const { affected } = await datasource
        .getRepository(Wilder)
        .delete(req.params.id);
      if (affected) return res.send('wilder deleted');
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
    }
  },
  addSkill: async (req, res) => {
    const wilderToUpdate = await datasource
      .getRepository(Wilder)
      .findOneBy({ id: req.params.wilderId });

    if (!wilderToUpdate) return res.status(404).send('wilder not found');

    const skillToAdd = await datasource
      .getRepository(Skill)
      .findOneBy({ id: req.body.skillId });

    if (!skillToAdd) return res.status(404).send('skill not found');

    wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];

    await datasource.getRepository(Wilder).save(wilderToUpdate);

    res.send('skill added to wilder');
  },
  removeSkill: async (req, res) => {
    const wilderToUpdate = await datasource
      .getRepository(Wilder)
      .findOneBy({ id: req.params.wilderId });

    if (!wilderToUpdate) return res.status(404).send('wilder not found');

    const skillToDeleteId = parseInt(req.params.skillId, 10);

    wilderToUpdate.skills = wilderToUpdate.skills.filter(
      (s) => s.id !== skillToDeleteId
    );

    await datasource.getRepository(Wilder).save(wilderToUpdate);
    res.send('skill deleted from wilder');
  },
};
