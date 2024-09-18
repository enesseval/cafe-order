import { format } from "date-fns";
import { MdErrorOutline } from "react-icons/md";
import { useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { Badge } from "./ui/badge";
import { Orders } from "@/gql/graphql";
import { Skeleton } from "./ui/skeleton";
import { Progress } from "./ui/progress";

import { GET_TODAY_ORDERS, TOTAL_TWO_DATE_RANGES_PRICE } from "@/queries/queries";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

function TodayOrders() {
   const [orderStatus, setOrderStatus] = useState({
      received: 0,
      preparing: 0,
      ready: 0,
      delivered: 0,
   });
   const [todayTotal, setTodayTotal] = useState(0);
   const [yesterdayPercentage, setYesterdayPercentage] = useState(0);

   const { data, loading, error } = useSubscription(GET_TODAY_ORDERS, { variables: { date: format(new Date(), "yyyy-MM-dd") } });

   const {
      data: yesterdayData,
      loading: yesterdayLoading,
      error: yesterdayError,
   } = useSubscription(TOTAL_TWO_DATE_RANGES_PRICE, { variables: { startDate: format(new Date().getTime() - 86400000, "yyyy-MM-dd"), endDate: format(new Date(), "yyyy-MM-dd") } });

   useEffect(() => {
      const status = {
         received: 0,
         preparing: 0,
         ready: 0,
         delivered: 0,
      };

      let totalPrice = 0;
      if (data) {
         data.orders.forEach((order: Orders) => {
            totalPrice += order.order_price;
            switch (order.status) {
               case "received":
                  status.received++;
                  break;
               case "preparing":
                  status.preparing++;
                  break;
               case "ready":
                  status.ready++;
                  break;
               case "delivered":
                  status.delivered++;
                  break;
               default:
                  return;
            }
         });
         setOrderStatus(status);
         setTodayTotal(totalPrice);
      }
   }, [data]);

   useEffect(() => {
      if (yesterdayData && !yesterdayLoading && !yesterdayError) {
         setYesterdayPercentage(Math.round(((todayTotal - yesterdayData.orders_aggregate.aggregate.sum.order_price) / yesterdayData.orders_aggregate.aggregate.sum.order_price) * 100));
      }
   }, [yesterdayData, yesterdayLoading, yesterdayError, todayTotal]);

   return (
      <div className="grid grid-rows-2 col-span-3 md:col-span-1 gap-1">
         {loading || yesterdayLoading ? (
            <Skeleton className="row-span-1" />
         ) : error || yesterdayError ? (
            <Card className="row-span-1 flex items-center justify-center">
               <MdErrorOutline className="w-14 h-14" />
            </Card>
         ) : (
            <Card className="row-span-1">
               <CardHeader className="pb-2">
                  <CardDescription>Bugün</CardDescription>
                  <CardTitle className="text-4xl">₺{todayTotal.toFixed(2)}</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className={"text-xs text-muted-foreground"}>
                     Bugün satışlar {yesterdayPercentage}% {yesterdayPercentage > 0 ? "daha iyi" : "daha kötü"}
                  </div>
               </CardContent>
               <CardFooter>
                  <Progress className="rounded-sm h-2.5" value={yesterdayPercentage > 0 ? yesterdayPercentage : yesterdayPercentage * -1} />
               </CardFooter>
            </Card>
         )}
         {loading ? (
            <Skeleton className="row-span-1" />
         ) : error ? (
            <Card className="row-span-1 flex items-center justify-center">
               <MdErrorOutline className="w-14 h-14" />
            </Card>
         ) : (
            <Card className="row-span-1">
               <CardHeader className="space-y-0 pb-2">
                  <CardTitle>Sipariş durumu</CardTitle>
                  <CardDescription>Anlık</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid grid-cols-2 justify-items-center gap-2">
                     <div>
                        <Badge className="bg-blue-500 text-white">Sipariş Alındı</Badge>
                        <h1 className="text-center">{orderStatus.received}</h1>
                     </div>
                     <div>
                        <Badge className="bg-yellow-500 text-black">Hazırlanıyor</Badge>
                        <h1 className="text-center">{orderStatus.preparing}</h1>
                     </div>
                     <div>
                        <Badge className="bg-green-500 text-white">Hazırlandı</Badge>
                        <h1 className="text-center">{orderStatus.ready}</h1>
                     </div>
                     <div>
                        <Badge className="bg-gray-500 text-white">Teslim Edildi</Badge>
                        <h1 className="text-center">{orderStatus.delivered}</h1>
                     </div>
                  </div>
               </CardContent>
            </Card>
         )}
      </div>
   );
}

export default TodayOrders;
