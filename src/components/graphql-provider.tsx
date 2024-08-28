"use client";

import { setContext } from "@apollo/client/link/context";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";

const httpLink = createHttpLink({
   uri: "https://cafe-order.hasura.app/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
   return {
      headers: {
         ...headers,
         "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
      },
   };
});

export const ApllProvider = ({ children }: { children: ReactNode }) => {
   const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
   });

   return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
