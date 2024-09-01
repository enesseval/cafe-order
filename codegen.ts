import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const adminSecret = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "";

if (!adminSecret) throw new Error("dsaa");

const config: CodegenConfig = {
   schema: {
      "https://cafe-order.hasura.app/v1/graphql": {
         headers: {
            "x-hasura-admin-secret": adminSecret,
         },
      },
   },
   documents: ["src/**/*.tsx", "src/**/*.graphql"],
   ignoreNoDocuments: true,
   generates: {
      "./src/gql/": {
         preset: "client",
      },
   },
};

export default config;
