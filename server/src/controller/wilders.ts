import { IController } from "./../types/IController";
import datasource from "../db";
import Skill from "../entity/Skill";
import Wilder from "../entity/Wilder";
import Grade from "../entity/Grade";

const wildersController: IController = {
  create: async (req, res) => {
    const { name, bio, city } = req.body;
    if (name?.length > 100 || name?.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    try {
      const created = await datasource.getRepository(Wilder).save({ name, bio , city });
      res.status(201).send(created);
    } catch (err) {
      console.error(err);
      res.send("error while creating wilder");
    }
  },
  read: async (req, res) => {
    try {
      const wilders = await datasource.getRepository(Wilder).find();
      res.send(wilders);
    } catch (err) {
      console.error(err);
      res.send("error while reading wilders");
    }
  },
  update: async (req, res) => {
    const { name } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    try {
      const { affected } = await datasource
        .getRepository(Wilder)
        .update(req.params.id, req.body);
      if (affected !== 0) return res.send("wilder updated");
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.send("error while updating wilder");
    }
  },
  delete: async (req, res) => {
    try {
      const { affected } = await datasource
        .getRepository(Wilder)
        .delete(req.params.id);
      if (affected !== 0) return res.send("wilder deleted");
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
    }
  },
  addSkill: async (req, res) => {
    const wilderToUpdate = await datasource
      .getRepository(Wilder)
      .findOneBy({ id: parseInt(req.params.wilderId, 10) });

    if (wilderToUpdate === null)
      return res.status(404).send("wilder not found");

    const skillToAdd = await datasource
      .getRepository(Skill)
      .findOneBy({ id: req.body.skillId });

    if (skillToAdd === null) return res.status(404).send("skill not found");

    // wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];

    await datasource.getRepository(Grade).insert({
      wilder: wilderToUpdate,
      skill: skillToAdd,
    });

    res.send("skill added to wilder");
  },
  removeSkill: async (req, res) => {
    const wilderToUpdate = await datasource
      .getRepository(Wilder)
      .findOneBy({ id: parseInt(req.params.wilderId, 10) });

    if (wilderToUpdate === null)
      return res.status(404).send("wilder not found");

    const skillToRemove = await datasource
      .getRepository(Skill)
      .findOneBy({ id: parseInt(req.params.skillId, 10) });

    if (skillToRemove === null) return res.status(404).send("skill not found");

    await datasource.getRepository(Grade).delete({
      wilderId: wilderToUpdate.id,
      skillId: skillToRemove.id,
    });
    res.send("skill deleted from wilder");
  },
};

export default wildersController;
