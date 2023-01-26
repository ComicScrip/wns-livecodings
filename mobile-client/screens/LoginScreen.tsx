import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const [error, setError] = useState("");

  const { data, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const [credentials, setCredentials] = useState({
    email: "admin@gmail.com",
    password: "Test@123",
  });

  console.log({ data });

  return (
    <View style={styles.container}>
      {data?.profile ? (
        <View>
          <Text>connecté en tant que {data.profile.email}</Text>
          <Button
            onPress={async () => {
              await logout();
              await client.resetStore();
            }}
            title="Log out"
          />
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Email"
            value={credentials.email}
            onChangeText={(email) => setCredentials({ ...credentials, email })}
          />
          <TextInput
            placeholder="Password"
            value={credentials.password}
            onChangeText={(password) =>
              setCredentials({ ...credentials, password })
            }
          />
          <Button
            onPress={async () => {
              setError("");
              login({ variables: { data: credentials } })
                .then((res) => {
                  if (res.data?.login)
                    SecureStore.setItemAsync("token", res.data?.login);
                  client.resetStore();
                })
                .catch(() => setError("Invalid credentials"));
            }}
            title="Log In"
          />
          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
