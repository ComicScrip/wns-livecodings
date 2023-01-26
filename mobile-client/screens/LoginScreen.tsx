import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    email: "admin@gmail.com",
    password: "Test@123",
  });
  const [error, setError] = useState("");

  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <View>
      <Text>login screen</Text>
      {currentUser?.profile ? (
        <View>
          <Text>connected as {currentUser?.profile.email}</Text>
          <Button
            onPress={async () => {
              await logout();
              client.resetStore();
              SecureStore.setItemAsync("token", "");
            }}
            title="Log out"
          />
        </View>
      ) : (
        <View>
          <TextInput
            onChangeText={(val) =>
              setCredentials({ ...credentials, email: val })
            }
            value={credentials.email}
          />
          <TextInput
            onChangeText={(val) =>
              setCredentials({ ...credentials, password: val })
            }
            value={credentials.password}
          />
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <Button
            onPress={() => {
              login({ variables: { data: credentials } })
                .then((res) => {
                  client.resetStore();
                  if (res.data?.login)
                    SecureStore.setItemAsync("token", res.data?.login);
                })
                .catch(() => setError("invalid credentials"));
            }}
            title="Log in"
          />
        </View>
      )}
    </View>
  );
}
