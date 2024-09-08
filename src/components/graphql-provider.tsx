"use client";

import { setContext } from "@apollo/client/link/context";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { ReactNode } from "react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createHttpLink({
   uri: "https://cafe-order.hasura.app/v1/graphql",
});

const wsLink = new GraphQLWsLink(
   createClient({
      url: "wss://cafe-order.hasura.app/v1/graphql",
      connectionParams: async () => {
         return {
            headers: {
               "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
            },
         };
      },
   })
);

const authLink = setContext((_, { headers }) => {
   return {
      headers: {
         ...headers,
         "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
      },
   };
});

const splitLink = split(
   ({ query }) => {
      const defination = getMainDefinition(query);
      return defination.kind === "OperationDefinition" && defination.operation === "subscription";
   },
   wsLink,
   authLink.concat(httpLink)
);

export const ApllProvider = ({ children }: { children: ReactNode }) => {
   const client = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache({
         typePolicies: {
            Subscription: {
               fields: {
                  tables: {
                     merge(existing = [], incomming: any[]) {
                        return [...existing, ...incomming];
                     },
                  },
                  categories: {
                     merge(existing = [], incomming: any[]) {
                        return [...existing, ...incomming];
                     },
                  },
                  orders: {
                     merge(existing = [], incomming: any[]) {
                        return [...existing, ...incomming];
                     },
                  },
               },
            },
         },
      }),
   });

   return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
