import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "http://localhost:4000",
    credentials: "include",
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});
