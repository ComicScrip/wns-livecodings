import { ApolloError } from "apollo-server-errors";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, {
  getSafeAttributes,
  hashPassword,
  UserInput,
  verifyPassword,
} from "../entity/User";
import { ContextType } from "../index";
import jwt from "jsonwebtoken";
import { env } from "../environment";

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const exisitingUser = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (exisitingUser) throw new ApolloError("EMAIL_ALREADY_EXISTS");

    const hashedPassword = await hashPassword(data.password);
    return await datasource
      .getRepository(User)
      .save({ ...data, hashedPassword });
  }

  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: UserInput,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });

    if (
      user === null ||
      typeof user.hashedPassword !== "string" ||
      !(await verifyPassword(password, user.hashedPassword))
    )
      throw new ApolloError("invalid credentials");

    // https://www.npmjs.com/package/jsonwebtoken
    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    // https://stackoverflow.com/a/40135050
    ctx.res.cookie("token", token, {
      secure: env.NODE_ENV === "production",
      domain: env.SERVER_HOST,
      httpOnly: true,
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType) {
    ctx.res.clearCookie("token");
    return "OK";
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }
}
