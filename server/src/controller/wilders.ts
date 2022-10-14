import datasource from "../db";
import Grade from "../entity/Grade";
import Skill from "../entity/Skill";
import Wilder from "../entity/Wilder";
import { IController } from "../types/IController";

const wilderController: IController = {
  create: async (req, res) => {
    const { name, bio, city } = req.body;
    if (name.length > 100 || name.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    const exisitingWithName = await datasource
      .getRepository(Wilder)
      .findOne({ where: { name } });

    if (exisitingWithName === null) return res.sendStatus(409);

    try {
      const created = await datasource
        .getRepository(Wilder)
        .save({ name, bio, city });
      res.status(201).send(created);
    } catch (err) {
      console.error(err);
      res.send("error while creating wilder");
    }
  },
  read: async (req, res) => {
    try {
      const wilders = await datasource
        .getRepository(Wilder)
        .find({ relations: { grades: { skill: true } } });

      res.send(
        wilders.map((w) => ({
          ...w,
          grades: undefined,
          skills: w.grades.map((g) => ({
            id: g.skill.id,
            name: g.skill.name,
            votes: g.votes,
          })),
        }))
      );
    } catch (err) {
      console.error(err);
      res.send("error while reading wilders");
    }
  },
  readOne: async (req, res) => {
    try {
      const wilder = await datasource.getRepository(Wilder).findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: { grades: { skill: true } },
      });
      if (wilder === null) return res.sendStatus(404);
      res.send({
        ...wilder,
        grades: undefined,
        skills: wilder.grades.map((g) => ({
          id: g.skill.id,
          name: g.skill.name,
          votes: g.votes,
        })),
      });
    } catch (err) {
      console.error(err);
      res.send("error while reading wilders");
    }
  },
  update: async (req, res) => {
    const { name } = req.body;
    const id = parseInt(req.params.id, 10);
    if (name?.length > 100 || name?.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    try {
      const { name, bio, avatarUrl, city, skills } = req.body;
      const wilderToUpdate = await datasource
        .getRepository(Wilder)
        .findOne({ where: { id }, relations: { grades: { skill: true } } });

      if (wilderToUpdate === null) return res.sendStatus(404);

      wilderToUpdate.name = name;
      wilderToUpdate.bio = bio;
      wilderToUpdate.city = city;
      wilderToUpdate.avatarUrl = avatarUrl;

      await datasource.getRepository(Wilder).save(wilderToUpdate);

      const existingSkillIds = wilderToUpdate.grades.map((g) => g.skill.id);
      const newSkillIds = (
        (typeof skills === "undefined" ? [] : skills) as Skill[]
      ).map((s: Skill) => s.id);
      const skillIdsToAdd = newSkillIds.filter(
        (newId) => !existingSkillIds.includes(newId)
      );
      const skillsToRemove = existingSkillIds.filter(
        (existingId) => !newSkillIds.includes(existingId)
      );

      await datasource.getRepository(Grade).save(
        skillIdsToAdd.map((skillId) => ({
          skillId,
          wilderId: wilderToUpdate.id,
        }))
      );

      await Promise.all(
        skillsToRemove.map(
          async (skillId: number) =>
            await datasource
              .getRepository(Grade)
              .delete({ wilderId: wilderToUpdate.id, skillId })
        )
      );

      res.send("wilder updated");
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

    await datasource.getRepository(Grade).insert({
      wilder: wilderToUpdate,
      skill: skillToAdd,
    });

    res.send("skill added to wilder");
  },
  updateGrade: async (req, res) => {
    const grade = await datasource.getRepository(Grade).findOne({
      where: {
        wilderId: parseInt(req.params.wilderId, 10),
        skillId: parseInt(req.params.skillId, 10),
      },
    });
    if (grade === null) return res.sendStatus(404);
    grade.votes = req.body.votes;
    await datasource.getRepository(Grade).save(grade);
    res.send("OK");
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

export default wilderController;
