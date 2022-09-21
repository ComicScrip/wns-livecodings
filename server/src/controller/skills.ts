import datasource from '../db';
import Skill from'../entity/Skill';
import { IController } from "./../types/IController";

const skillsController: IController = {
  create: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send('the name should have a length between 1 and 100 characters');
    }

    const existingSkill = await datasource
      .getRepository(Skill)
      .findOneBy({ name });

    if (existingSkill !== null )
      return res.status(409).send('a skill with this name already exists');

    try {
      const created = await datasource.getRepository(Skill).save({ name });
      res.status(201).send(created);
    } catch (err) {
      console.error(err);
      res.send('error while creating skill');
    }
  },
  read: async (req, res) => {
    try {
      const skills = await datasource.getRepository(Skill).find();
      res.send(skills);
    } catch (err) {
      console.error(err);
      res.send('error while reading skills');
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
        .getRepository(Skill)
        .update(req.params.id, req.body);
      if (affected !== 0) return res.send('skill updated');
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.send('error while updating skill');
    }
  },
  delete: async (req, res) => {
    try {
      const { affected } = await datasource
        .getRepository(Skill)
        .delete(req.params.id);
      if (affected !== 0) return res.send('skill deleted');
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
    }
  },
};
export default skillsController