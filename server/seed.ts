import db from "./src/db";
import User, { hashPassword } from "./src/entity/User";

async function seed(): Promise<void> {
  await db.initialize();
  await db.getRepository(User).delete({});
  await db.getRepository(User).insert({
    email: "admin@gmail.com",
    hashedPassword: await hashPassword("Test@123"),
    role: "admin",
  });
  await db.destroy();
  console.log("done");
}

seed().catch(console.error);
