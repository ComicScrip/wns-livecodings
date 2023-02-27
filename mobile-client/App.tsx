import WildersScreen from "./screens/WildersScreen";
import client from "./gql/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";
import { Platform } from "react-native";
import {
  UpdateUserDocument,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  useGetProfileQuery,
} from "./gql/generated/schema";

const Tab = createBottomTabNavigator();

export default function App() {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const { data: currentUser } = useGetProfileQuery({ errorPolicy: "ignore" });

  useEffect(() => {
    console.log("profile id changed", currentUser?.profile);

    if (currentUser?.profile)
      registerForPushNotificationsAsync(currentUser?.profile?.id);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("received", { notification });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("notif interaction", { response });
      });

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [currentUser?.profile.id]);

  return (
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
            return <Ionicons name={"alert-circle"} size={size} color={color} />;
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
  );
}

async function registerForPushNotificationsAsync(userId: number) {
  console.log("registering device...", { userId });

  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    const { data, errors } = await client.mutate<
      UpdateUserMutation,
      UpdateUserMutationVariables
    >({
      mutation: UpdateUserDocument,
      variables: {
        data: { expoNotificationToken: token },
        updateUserId: userId,
      },
    });
    console.log("token sent to backend", { token, data, errors });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
