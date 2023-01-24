import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";

export default function LoginScreen() {
  const { data, refetch } = useGetProfileQuery();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const [credentials, setCredentials] = useState({
    email: "admin@gmail.com",
    password: "Test@123",
  });

  console.log({ data });

  return (
    <View style={styles.container}>
      <Button
        onPress={async () => {
          const res = await fetch("https://google.com");
          console.log({ res });
        }}
        title="test"
      />
      {data?.profile ? (
        <View>
          <Text>connecté en tant que {data.profile.email}</Text>
          <Button
            onPress={async () => {
              await logout();
              refetch();
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
              const loginResult = await login({
                variables: { data: credentials },
              });
              refetch();
              console.log({ loginResult });
            }}
            title="Log In"
          />
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
