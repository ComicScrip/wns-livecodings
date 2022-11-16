import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const uri = "http://localhost:4000";

const link = createHttpLink({
  uri,
  credentials: "include",
});

export default new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  link,
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});
