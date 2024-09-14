"use client";

import React from "react";
import { columns } from "./columns";
import Loading from "@/components/Loading";
import type { Orders } from "@/gql/graphql";
import { useSubscription } from "@apollo/client";
import { GET_ALL_ORDERS } from "@/queries/queries";
import { DataTable } from "../../../components/data-table/date-table";

function Orders() {
   const { data, loading, error } = useSubscription(GET_ALL_ORDERS);

   if (loading) return <Loading />;

   return <div>{data && !error && <DataTable columns={columns} data={data.orders} />}</div>;
}

export default Orders;
