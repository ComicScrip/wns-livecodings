import { Arg, Int, Mutation, Resolver } from "type-graphql";
import Grade from "../entity/Grade";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";

@Resolver()
export class GradeResolver {
  @Mutation(() => Boolean)
  async updateGrade(
    @Arg("wilderId", () => Int) wilderId: number,
    @Arg("skillId", () => Int) skillId: number,
    @Arg("votes", () => Int) votes: number
  ): Promise<Boolean> {
    const grade = await datasource.getRepository(Grade).findOne({
      where: { wilderId, skillId },
    });
    if (grade === null) throw new ApolloError("grade not found", "NOT_FOUND");
    grade.votes = votes;
    await datasource.getRepository(Grade).save(grade);
    return true;
  }
}
