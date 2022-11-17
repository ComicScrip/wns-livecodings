import { load } from "ts-dotenv";

// https://github.com/LeoBakerHytch/ts-dotenv
export const env = load({
  GRAPHQL_API_URL: String,
});
