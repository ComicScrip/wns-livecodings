import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginScreen from "./screens/LoginScreen";
import WildersScreen from "./screens/WildersScreen";
import client from "./gql/client";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Login") {
                return (
                  <Ionicons
                    name={focused ? "person-circle" : "person-circle-outline"}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "Wilders") {
                return (
                  <Ionicons
                    name={focused ? "people-circle" : "people-circle-outline"}
                    size={size}
                    color={color}
                  />
                );
              }
              return (
                <Ionicons name={"alert-circle"} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: "#f76c6c",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { height: 60, paddingBottom: 10 },
          })}
        >
          <Tab.Screen name="Wilders" component={WildersScreen} />

          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
