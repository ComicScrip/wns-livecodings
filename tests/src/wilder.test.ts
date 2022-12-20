import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://backend:4000/",
    fetch,
  }),
  cache: new InMemoryCache(),
});

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
      ).rejects.toThrow();
    });
  });

  describe("read wilders", () => {
    it("should return an array", async () => {
      const res = await client.query({
        query: readWildersQuery,
        fetchPolicy: "no-cache",
      });

      expect(res.data.wilders[0]).toHaveProperty("id");
      expect(res.data.wilders[0]).toHaveProperty("name");
    });
  });
});
