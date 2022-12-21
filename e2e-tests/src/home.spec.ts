import { test, expect } from "@playwright/test";
import db from "../../server/src/db";
import Wilder from "../../server/src/entity/Wilder";
import { clearDB, connect, disconnect } from "./dbHelpers";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can view wilders in db", async ({ page }) => {
  await db.getRepository(Wilder).delete({});
  await db
    .getRepository(Wilder)
    .insert([{ name: "Wilder1" }, { name: "Wilder2" }]);

  await page.goto("/");

  await expect(page.getByTestId("wilder-list")).toContainText("Wilder1");
  await expect(page.getByTestId("wilder-list")).toContainText("Wilder2");
});
