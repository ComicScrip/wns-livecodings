import db from "../../server/src/db";

export async function connect() {
  await db.initialize();
}

export async function disconnect() {
  await db.destroy();
}

export async function clearDB() {
  const entities = db.entityMetadatas;
  return Promise.all(
    entities.map((entity) => db.getRepository(entity.name).delete({}))
  );
}
