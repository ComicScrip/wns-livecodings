import { ApolloError } from "apollo-server-errors";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, { hashPassword, UserInput, verifyPassword } from "../entity/User";
import { sign } from "jsonwebtoken";
import { env } from "../environment";

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
  async login(@Arg("data") data: UserInput, @Ctx() ctx: any): Promise<string> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (
      user === null ||
      !(await verifyPassword(data.password, user.hashedPassword))
    )
      throw new ApolloError("invalid credentials");

    const token = sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    ctx.res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      domain: env.HOST,
    });

    return token;
  }

  @Query(() => User)
  async profile(@Ctx() ctx: any): Promise<User> {
    console.log(ctx.req.cookies);

    return await datasource
      .getRepository(User)
      .findOneOrFail({ where: { id: 12 } });
  }
}
