import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Wilder, { WilderInput } from "../entity/Wilder";
import datasource from "../db";

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

  @Mutation()
  async createWilder(@Arg("data") wilderProps: WilderInput): Promise<Wilder> {
    const { raw: id } = await datasource
      .getRepository(Wilder)
      .insert(wilderProps);
    return { id, grades: [], skills: [] };
  }
}
