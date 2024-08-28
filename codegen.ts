import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
   schema: {
      "https://cafe-order.hasura.app/v1/graphql": {
         headers: {
            "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
         },
      },
   },
   documents: ["src/**/*.tsx"],
   ignoreNoDocuments: true,
   generates: {
      "./src/gql/": {
         preset: "client",
      },
   },
};

export default config;
