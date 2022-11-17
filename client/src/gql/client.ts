import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { env } from "../environment";

//https://www.apollographql.com/docs/react/networking/authentication/#cookie
export default new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
    uri: env.GRAPHQL_API_URL,
    credentials: "include",
  }),
});
