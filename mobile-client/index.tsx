import { ApolloProvider } from "@apollo/client";
import { registerRootComponent } from "expo";

import App from "./App";
import client from "./gql/client";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(() => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
));
