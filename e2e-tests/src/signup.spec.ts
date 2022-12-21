import { test, expect } from "@playwright/test";
import { clearDB, connect, disconnect } from "./dbHelpers";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can sign up with correct info", async ({ page }) => {
  await page.goto("/signup");

  await page.getByTestId("signup-email").type("test@example.com");
  await page.getByTestId("signup-password").type("1T!zeufhizuhef");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page).toHaveURL(/.*login/);
});
