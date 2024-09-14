"use client";

import { ReactNode } from "react";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { useAuth, useUser } from "@clerk/nextjs";

export const Provider = ({ children }: { children: ReactNode }) => {
   const { getToken } = useAuth();
   const { isSignedIn } = useUser();

   const httpLink = createHttpLink({
      uri: "https://cafe-order.hasura.app/v1/graphql",
   });

   const wsLink = new GraphQLWsLink(
      createClient({
         url: "wss://cafe-order.hasura.app/v1/graphql",
         connectionParams: async () => {
            const token = await getToken({ template: "hasura" });
            const headers = isSignedIn ? { Authorization: `Bearer ${token}` } : { "x-hasura-role": "anonymous" };
            return {
               headers,
            };
         },
      })
   );

   const authLink = setContext(async (_, { header }) => {
      const token = await getToken({ template: "hasura" });
      const headers = isSignedIn ? { ...header, Authorization: `Bearer ${token}` } : { ...header, "x-hasura-role": "anonymous" };
      return {
         headers,
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
                  foods: {
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
