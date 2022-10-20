import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: "src/gql/*.{gql,graphql}",
  generates: {
    "src/gql/generated.ts": {
      preset: "client",
      plugins: ["typescript-react-apollo"],
    },
  },
};

export default config;
