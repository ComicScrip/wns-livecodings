import db from "../../server/src/db";
import User from "../../server/src/entity/User";
import jwt from "jsonwebtoken";

import { env } from "../../server/src/env";

export async function getJWTFor(user: Partial<User>) {
  await db.getRepository(User).save(user);
  return jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
}
