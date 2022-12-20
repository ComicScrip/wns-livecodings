import { DataSource } from "typeorm";
import Wilder from "../../server/src/entity/Wilder";
import Skill from "../../server/src/entity/Skill";
import Grade from "../../server/src/entity/Grade";
import User from "../../server/src/entity/User";

export default new DataSource({
  type: "postgres",
  host: "testDB",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [Wilder, Skill, Grade, User],
  logging: ["error"],
});
