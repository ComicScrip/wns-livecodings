import { ApolloError } from "apollo-server-errors";
import { Arg, Mutation, Resolver } from "type-graphql";
import datasource from "../db";
import User, { hashPassword, UserInput, verifyPassword } from "../entity/User";

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const hashedPassword = await hashPassword(data.password);
    return await datasource
      .getRepository(User)
      .save({ ...data, hashedPassword });
  }

  @Mutation(() => String)
  async login(@Arg("data") data: UserInput): Promise<string> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (
      user === null ||
      !(await verifyPassword(data.password, user.hashedPassword))
    )
      throw new ApolloError("invalid credentials");

    return "OK";
  }
}
