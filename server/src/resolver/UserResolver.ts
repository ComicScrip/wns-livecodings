import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import datasource from "../db";
import User, {
  getSafeAttributes,
  hashPassword,
  NotificationInput,
  UpdateUserInput,
  UserInput,
  verifyPassword,
} from "../entity/User";
import type { Role } from "../entity/User";
import { ContextType } from "../index";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { Expo } from "expo-server-sdk";

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const exisitingUser = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (exisitingUser !== null) throw new Error("EMAIL_ALREADY_EXISTS");

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
      throw new Error("invalid credentials");

    // https://www.npmjs.com/package/jsonwebtoken
    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    // https://stackoverflow.com/a/40135050
    ctx.res.cookie("token", token, {
      secure: env.NODE_ENV === "production",
      httpOnly: true,
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType): Promise<string> {
    ctx.res.clearCookie("token");
    return "OK";
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }

  @Authorized()
  @Mutation(() => User)
  async updateProfile(
    @Arg("data") data: UpdateUserInput,
    @Ctx() { currentUser }: ContextType
  ): Promise<User> {
    if (typeof currentUser === "undefined") throw new Error("no current user");
    return await datasource
      .getRepository(User)
      .save({ ...currentUser, ...data });
  }

  @Authorized<Role>(["admin"])
  @Mutation(() => Boolean)
  async sendNotification(
    @Arg("userId", () => Int) id: number,
    @Arg("data", { validate: false }) data: NotificationInput
  ): Promise<boolean> {
    const user = await datasource.getRepository(User).findOne({
      where: { id },
    });

    if (user === null) throw new Error("NOT_FOUND");

    if (
      user.expoNotificationToken === null ||
      typeof user.expoNotificationToken === "undefined"
    )
      throw new Error("user has no registered token");

    const res = await expo.sendPushNotificationsAsync([
      {
        to: user.expoNotificationToken,
        sound: "default",
        title: data.title,
        body: data.body,
        data:
          typeof data.JSONPayload === "string"
            ? JSON.parse(data.JSONPayload)
            : undefined,
      },
    ]);

    console.log({ res });

    return true;
  }
}
