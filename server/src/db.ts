import { DataSource } from "typeorm";
import { env } from "./env";
import { entities } from "./entity";

export default new DataSource({
  type: "postgres",
  host: env.DB_HOST || "db",
  port: env.DB_PORT || 5432,
  username: env.DB_USER || "postgres",
  password: env.DB_PASS || "postgres",
  database: env.DB_NAME || "postgres",
  synchronize: true,
  entities,
  logging: ["error"],
});
