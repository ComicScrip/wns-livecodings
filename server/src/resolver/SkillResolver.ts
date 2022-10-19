import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ApolloError } from "apollo-server-errors";
import Skill, { SkillInput } from "../entity/Skill";
import datasource from "../db";

@Resolver(Skill)
export class SkillResolver {
  @Query(() => [Skill])
  async skills(): Promise<Skill[]> {
    return await datasource.getRepository(Skill).find();
  }

  @Mutation(() => Skill)
  async createSkill(@Arg("data") { name }: SkillInput): Promise<Skill> {
    const { raw: id } = await datasource.getRepository(Skill).insert({ name });
    return { id, name };
  }

  @Mutation(() => Boolean)
  async deleteSkill(@Arg("id") id: string): Promise<boolean> {
    const { affected } = await datasource.getRepository(Skill).delete(id);
    if (affected === 0) throw new ApolloError("skill not found", "NOT_FOUND");
    return true;
  }

  @Mutation(() => Skill)
  async updateSkill(
    @Arg("id") id: string,
    @Arg("data") { name }: SkillInput
  ): Promise<Skill> {
    const { affected } = await datasource
      .getRepository(Skill)
      .update(parseInt(id, 10), { name });

    if (affected === 0) throw new ApolloError("skill not found", "NOT_FOUND");

    return { id: parseInt(id, 10), name };
  }
}
