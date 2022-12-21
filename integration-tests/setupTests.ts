import db from "../server/src/db";

// https://blog.tooljet.com/clearing-tables-before-each-test-nestjs-typeorm/
// https://github.com/typeorm/typeorm/issues/2978#issuecomment-730596460
async function clearDB() {
  const entities = db.entityMetadatas;
  return Promise.all(
    entities.map((entity) => db.getRepository(entity.name).delete({}))
  );
}

beforeAll(async () => {
  await db.initialize();
});

beforeEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await db.destroy();
});
