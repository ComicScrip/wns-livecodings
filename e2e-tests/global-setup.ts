// global-setup.ts

import db from "../server/src/db";

async function globalSetup() {
  console.log("setup !");
  await db.initialize();
  console.log("setup done !");
}

export default globalSetup;
