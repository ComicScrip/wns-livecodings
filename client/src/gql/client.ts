import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

console.log("api url : ", process.env.REACT_APP_GRAPHQL_API_URL);

//https://www.apollographql.com/docs/react/networking/authentication/#cookie
export default new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL,
    credentials: "include",
  }),
});
