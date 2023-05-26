import { StyleSheet, Text, View, Platform, Button } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/notifications";

export default function NotificationsScreen() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token || "")
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("user interaction with notification", response);
      });

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
    </View>
  );
}
