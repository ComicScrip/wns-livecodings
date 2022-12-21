import { load } from "ts-dotenv";

export const env = load({
  DB_HOST: { type: String, optional: true },
});
