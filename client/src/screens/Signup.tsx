import React, { useState } from "react";
import { useCreateUserMutation } from "../gql/generated/schema";

export default function Signup() {
  const [userInfos, setUserInfo] = useState({ email: "", password: "" });

  const [createUser] = useCreateUserMutation();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser({ variables: { data: userInfos } })
            .then(() => console.log("ok"))
            .catch(console.error);
        }}
      >
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            className="ml-2"
            value={userInfos.email}
            onChange={(e) =>
              setUserInfo({ ...userInfos, email: e.target.value })
            }
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            className="ml-2"
            value={userInfos.password}
            onChange={(e) =>
              setUserInfo({ ...userInfos, password: e.target.value })
            }
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
