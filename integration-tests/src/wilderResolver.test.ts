import { gql } from "@apollo/client/core";
import Wilder from "../../server/src/entity/Wilder";
import client from "./apolloClient";
import db from "../../server/src/db";

const createWilderMutation = gql`
  mutation CreateWilder($data: WilderInput!) {
    createWilder(data: $data) {
      id
      name
    }
  }
`;

const readWildersQuery = gql`
  query Wilders {
    wilders {
      id
      name
    }
  }
`;

describe("Wilder resolver", () => {
  describe("create wilder", () => {
    it("should create wilder given valid attributes", async () => {
      const res = await client.mutate({
        mutation: createWilderMutation,
        variables: { data: { name: "Dave" } },
      });

      expect(res.data?.createWilder).toHaveProperty("id");
      expect(res.data?.createWilder).toHaveProperty("name", "Dave");
    });

    it("should not create wilder given invalid attributes and return an error", async () => {
      expect(() =>
        client.mutate({
          mutation: createWilderMutation,
          variables: { data: { name: "" } },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Argument Validation Error"`
      );
    });
  });

  describe("read wilders", () => {
    it("should return an array", async () => {
      await db
        .getRepository(Wilder)
        .insert([{ name: "jojo" }, { name: "jaja" }]);

      const res = await client.query({
        query: readWildersQuery,
        fetchPolicy: "no-cache",
      });

      expect(res.data.wilders.length).toBe(2);
      expect(res.data.wilders[0]).toHaveProperty("id");
      expect(res.data.wilders[0]).toHaveProperty("name");
    });
  });
});
