import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useGetProfileQuery,
  useLoginMutation,
} from "../gql/generated/schema";

export default function Signup() {
  const [userInfos, setUserInfo] = useState({ email: "", password: "" });
  const [passwordError, setPasswordError] = useState(false);

  const [createUser] = useCreateUserMutation();

  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const { client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <div className="mt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!userInfos.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/))
            return setPasswordError(true);

          createUser({ variables: { data: userInfos } })
            .then(async () => {
              await login({ variables: { data: userInfos } });
              await client.resetStore();
              navigate("/login");
            })
            .catch((err) => {
              if (err.message === "EMAIL_ALREADY_EXISTS")
                toast.error("This email is already taken");
            });
        }}
      >
        <label htmlFor="email" className="block mb-2">
          Email
          <input
            data-testid="signup-email"
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

        <label htmlFor="password" className="block mb-2">
          Password
          <input
            data-testid="signup-password"
            type="password"
            id="password"
            name="password"
            className="ml-2"
            minLength={8}
            value={userInfos.password}
            onChange={(e) => {
              setUserInfo({ ...userInfos, password: e.target.value });
              setPasswordError(false);
            }}
          />
        </label>

        {passwordError && (
          <div className="text-red-500 mb-4">
            The password must contain at least 8 caracters and include an
            uppercase letter and a number
          </div>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
