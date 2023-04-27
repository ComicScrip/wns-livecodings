import { test, expect } from "@playwright/test";
import { clearDB, connect, disconnect } from "./dbHelpers";
import { hash } from "argon2";
import User from "../../server/src/entity/User";
import db from "../../server/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can log in with correct credentials", async ({ page }) => {
  await page.goto("/login");

  const email = "dave.lopper@website.com";
  const password = "1T!ESTINng";
  const hashedPassword = await hash(password);
  await db.getRepository(User).insert({ email, hashedPassword });

  await page.goto("/login");
  await page.getByTestId("login-email").type(email);
  await page.getByTestId("login-password").type(password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByTestId("logged-in-message")).toContainText(
    `Logged in a ${email}`
  );
});
