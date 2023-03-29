import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import Wilder, { SkillId, WilderInput } from "../entity/Wilder";
import datasource from "../db";
import Grade from "../entity/Grade";
import { Role } from "../entity/User";

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async wilders(): Promise<Wilder[]> {
    const wilders = await datasource
      .getRepository(Wilder)
      .find({ relations: { grades: { skill: true } } });

    return wilders.map((w) => ({
      ...w,
      skills: w.grades.map((g) => ({
        id: g.skill.id,
        name: g.skill.name,
        votes: g.votes,
      })),
    }));
  }

  @Query(() => Wilder)
  async wilder(@Arg("id", () => Int) id: number): Promise<Wilder> {
    const wilder = await datasource
      .getRepository(Wilder)
      .findOne({ where: { id }, relations: { grades: { skill: true } } });

    if (wilder === null) throw new Error("wilder not found");

    return {
      ...wilder,
      skills: wilder.grades.map((g) => ({
        id: g.skill.id,
        name: g.skill.name,
        votes: g.votes,
      })),
    };
  }

  @Mutation(() => Wilder)
  async createWilder(@Arg("data") data: WilderInput): Promise<Wilder> {
    return await datasource.getRepository(Wilder).save(data);
  }

  @Authorized<Role>(["admin"])
  @Mutation(() => Boolean)
  async deleteWilder(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(Wilder).delete(id);
    if (affected === 0) throw new Error("wilder not found");
    return true;
  }

  @Mutation(() => Wilder)
  async updateWilder(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: WilderInput
  ): Promise<Wilder> {
    const { name, bio, avatarUrl, city, skills } = data;
    const wilderToUpdate = await datasource.getRepository(Wilder).findOne({
      where: { id },
      relations: { grades: { skill: true } },
    });

    if (wilderToUpdate === null) throw new Error("NOT_FOUND");

    wilderToUpdate.name = name;
    wilderToUpdate.bio = bio;
    wilderToUpdate.city = city;
    wilderToUpdate.avatarUrl = avatarUrl;

    await datasource.getRepository(Wilder).save(wilderToUpdate);

    const existingSkillIds = wilderToUpdate.grades.map((g) => g.skill.id);
    const newSkillIds = (typeof skills === "undefined" ? [] : skills).map(
      (s: SkillId) => s.id
    );
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

    return wilderToUpdate;
  }
}
