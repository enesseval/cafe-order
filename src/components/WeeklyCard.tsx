import { Orders } from "@/gql/graphql";
import { Skeleton } from "./ui/skeleton";
import { ORDER_WEEKLY_COUNT } from "@/queries/queries";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

import { MdErrorOutline } from "react-icons/md";
import { useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import { Bar, BarChart, Rectangle, ReferenceLine, XAxis } from "recharts";

function getWeekStartDay() {
   const day = new Date();
   const calculatedDate = new Date(day.getTime() - 86400000 * 6);
   return format(calculatedDate, "yyyy-MM-dd");
}

function WeeklyCard() {
   const [weeklyOrders, setWeeklyOrders] = useState<{ date: string; count: number }[]>([]);

   const { data, loading, error } = useSubscription(ORDER_WEEKLY_COUNT, { variables: { date: getWeekStartDay() } });

   useEffect(() => {
      if (data && !loading && !error) {
         const ordersMap: { [key: string]: number } = {};

         data.orders.forEach((order: Orders) => {
            const date = order.created_at.split("T")[0];

            if (ordersMap[date]) ordersMap[date] += 1;
            else ordersMap[date] = 1;
         });

         const finalData = eachDayOfInterval({
            start: getWeekStartDay(),
            end: new Date(),
         }).map((date) => {
            return { date: format(date, "yyyy-MM-dd"), count: ordersMap[format(date, "yyyy-MM-dd")] || 0 };
         });

         setWeeklyOrders(finalData);
      }
   }, [data, loading, error]);

   if (loading) return <Skeleton className="col-span-3 md:col-span-1 aspect-square" />;

   if (error)
      return (
         <Card className="col-span-3 md:col-span-1 aspect-square flex items-center justify-center">
            <MdErrorOutline className="w-14 h-14" />
         </Card>
      );

   return (
      <Card className="col-span-3 md:col-span-1">
         <CardHeader className="space-y-0 pb-2">
            <CardDescription>Bugün</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
               {weeklyOrders.map((order) => order.date === format(new Date(), "yyyy-MM-dd") && order.count)}{" "}
               <span className="font-poppins text-sm font-normal tracking-normal text-muted-foreground">sipariş</span>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <ChartContainer config={{ count: { label: "Siparişler", color: "hsl(var(--chart-1))" } }}>
               <BarChart accessibilityLayer margin={{ left: -4, right: -4 }} data={weeklyOrders}>
                  <Bar dataKey="count" fill="hsl(var(--chart-4))" radius={5} fillOpacity={0.6} activeBar={<Rectangle fillOpacity={0.8} />} />
                  <XAxis
                     dataKey="date"
                     tickLine={false}
                     axisLine={false}
                     tickMargin={4}
                     tickFormatter={(val) => {
                        return new Date(val).toLocaleDateString("tr-TR", { weekday: "short" });
                     }}
                  />

                  <ChartTooltip
                     defaultIndex={2}
                     content={
                        <ChartTooltipContent
                           nameKey="count"
                           hideIndicator
                           labelFormatter={(val) => {
                              return new Date(val).toLocaleDateString("tr-TR", {
                                 day: "numeric",
                                 month: "long",
                                 year: "numeric",
                              });
                           }}
                        />
                     }
                     cursor={false}
                  />
                  {weeklyOrders.map(
                     (order) =>
                        order.date === format(new Date(), "yyyy-MM-dd") &&
                        order.count !== 0 && <ReferenceLine key={order.date} y={order.count} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                  )}
               </BarChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
               Son {weeklyOrders.length} günde toplam
               <span className="font-medium text-foreground"> {data.orders.length} </span> sipariş aldın.
            </CardDescription>
         </CardFooter>
      </Card>
   );
}

export default WeeklyCard;
