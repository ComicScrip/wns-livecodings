import { load } from "ts-dotenv";

// https://github.com/LeoBakerHytch/ts-dotenv
export const env = load({
  JWT_PRIVATE_KEY: String,
  CORS_ALLOWED_ORIGINS: String,
  NODE_ENV: ["production" as const, "development" as const, "test" as const],
  SERVER_HOST: String,
  SERVER_PORT: Number,
  DB_HOST: { type: String, optional: true },
  DB_PORT: { type: Number, optional: true },
  DB_USER: { type: String, optional: true },
  DB_PASS: { type: String, optional: true },
  DB_NAME: { type: String, optional: true },
});
