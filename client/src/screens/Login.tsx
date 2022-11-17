import React, { useState } from "react";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [login] = useLoginMutation();

  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const [logout] = useLogoutMutation();

  return (
    <div className="mt-8">
      {currentUser ? (
        <div className="mb-8">
          Logged in as {currentUser.profile.email}
          <button
            onClick={async () => {
              await logout();
              await client.resetStore();
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login({ variables: { data: credentials } })
              .then(() => client.resetStore())
              .catch(console.error);
          }}
        >
          <label htmlFor="email" className="block mb-2">
            Email
            <input
              type="email"
              id="email"
              className="ml-2"
              name="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </label>

          <label htmlFor="password" className="block mb-2">
            Password
            <input
              type="password"
              id="password"
              className="ml-2"
              name="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </label>

          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}
