import db from "../server/src/db";

beforeEach(async () => {
  console.log(await db.query("select * from wilders"));
});
