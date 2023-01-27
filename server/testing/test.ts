import { DataSource } from "typeorm";
import Counter from "./Counter";
import User from "./User";

const db = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [User, Counter],
  logging: ["error"],
});

async function updateUser(): Promise<User> {
  await db.initialize();
  await db.getRepository(User).delete({});
  await db.getRepository(Counter).delete({});
  const counter = await db.getRepository(Counter).save({ name: "c" });
  const user = await db.getRepository(User).save({ firstname: "toto" });

  user.counter = counter;

  await db.getRepository(User).save(user);

  console.log({
    counterWithUser: await db
      .getRepository(Counter)
      .findOne({ where: { id: counter.id }, relations: { user: true } }),
    userWithCounter: await db
      .getRepository(User)
      .findOne({ where: { id: user.id }, relations: { counter: true } }),
  });

  user.counter = null;

  await db.getRepository(User).save(user);

  console.log({
    counterWithoutUser: await db
      .getRepository(Counter)
      .findOne({ where: { id: counter.id }, relations: { user: true } }),
    userWithoutCounter: await db
      .getRepository(User)
      .findOne({ where: { id: user.id }, relations: { counter: true } }),
  });

  return user;
}

void updateUser();

/*
En l'état, ma fonction d'update enregistre bien le counter dans mon user, mais je voudrai aussi faire deux choses :

- Pouvoir faire passer mon counter à null dans mon user
- Pouvoir voir mon user apparaître dans mon counter lorsque le fais la première modification, et le voir passer à null lorsque je fais la seconde.

Comment faire ?
*/
