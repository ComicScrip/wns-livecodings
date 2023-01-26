import { ApolloProvider } from "@apollo/client";
import WildersScreen from "./screens/WildersScreen";
import client from "./gql/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <WildersScreen />
    </ApolloProvider>
  );
}
