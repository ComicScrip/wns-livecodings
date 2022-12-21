import { test, expect } from "@playwright/test";
import db from "../../server/src/db";
import Wilder from "../../server/src/entity/Wilder";

test("can login with correct credentials", async ({ page }) => {
  await db.getRepository(Wilder).delete({});
  await page.goto("/");
  page.getByPlaceholder("email").type("test@test.com");
});
