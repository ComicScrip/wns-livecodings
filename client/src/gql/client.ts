import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

//https://www.apollographql.com/docs/react/networking/authentication/#cookie
export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});
