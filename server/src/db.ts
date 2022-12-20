import { DataSource } from "typeorm";
import { entities } from "./entity";

export default new DataSource({
  type: "postgres",
  host: "testDB",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities,
  logging: ["query", "error"],
});
