import React, { useState } from "react";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";
import toast from "react-hot-toast";

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
          <div data-testid="logged-in-message">
            Logged in as {currentUser.profile.email}
          </div>

          <button
            onClick={async () => {
              await logout();
              await client.resetStore();
            }}
            className="mt-4"
          >
            Log out
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login({ variables: { data: credentials } })
              .then(client.resetStore)
              .catch(() => toast.error("Invalid credentials"));
          }}
        >
          <label htmlFor="email" className="block mb-2">
            Email
            <input
              data-testid="login-email"
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
              data-testid="login-password"
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
