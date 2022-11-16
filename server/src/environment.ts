import { load } from "ts-dotenv";

export const env = load({
  JWT_PRIVATE_KEY: String,
  CORS_ALLOWED_ORIGINS: String,
  NODE_ENV: ["production" as const, "development" as const],
  SERVER_HOST: String,
  SERVER_PORT: Number,
});
