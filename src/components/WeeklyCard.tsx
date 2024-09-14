import { Orders } from "@/gql/graphql";
import { Skeleton } from "./ui/skeleton";
import { ORDER_WEEKLY_COUNT } from "@/queries/queries";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

import { format } from "date-fns";
import { useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, Rectangle, ReferenceLine, XAxis } from "recharts";

function WeeklyCard() {
   const [weeklyOrders, setWeeklyOrders] = useState<{ date: string; count: number }[]>([]);
   const [todayOrder, setTodayOrder] = useState<{ date: string; count: number } | null>(null);
   function getWeekStartDay() {
      const day = new Date();
      day.setDate(day.getDate() - 7);
      return format(day, "yyyy-MM-dd");
   }

   const { data, loading, error } = useSubscription(ORDER_WEEKLY_COUNT, { variables: { date: getWeekStartDay() } });

   useEffect(() => {
      if (data && !loading && !error) {
         const weeklyData: { date: string; count: number }[] = [];
         let todayData: { date: string; count: number } | null = null;
         const today = new Date().toISOString().split("T")[0];
         data.orders.forEach((order: Orders) => {
            const date = order.updated_at.split("T")[0];
            const normalizedDate = date === today ? "today" : date;

            if (normalizedDate === "today") {
               if (todayData) {
                  todayData.count += 1;
               } else {
                  todayData = { date: "today", count: 1 };
               }
            } else {
               const existingDateEntry = weeklyData.find((entry) => entry.date === normalizedDate);
               if (existingDateEntry) {
                  existingDateEntry.count += 1;
               } else {
                  weeklyData.push({ date: normalizedDate, count: 1 });
               }
            }
         });
         setWeeklyOrders(weeklyData);
         setTodayOrder(todayData);
      }
   }, [data, loading, error]);

   console.log(weeklyOrders);
   console.log(todayOrder);

   if (weeklyOrders.length === 0 || !todayOrder) return <div>Sipariş bulunmadı</div>;

   if (loading) return <Skeleton className="col-span-3 md:col-span-1 aspect-square" />;

   return (
      <Card className="lg:max-w-md col-span-1">
         <CardHeader className="space-y-0 pb-2">
            <CardDescription>Bugün</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
               {todayOrder.count} <span className="font-poppins text-sm font-normal tracking-normal text-muted-foreground">sipariş</span>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <ChartContainer config={{ count: { label: "Siparişler", color: "hsl(var(--chart-1))" } }}>
               <BarChart accessibilityLayer margin={{ left: -4, right: -4 }} data={weeklyOrders}>
                  <Bar dataKey="count" fill="#999cdb" radius={5} fillOpacity={0.6} activeBar={<Rectangle fillOpacity={0.8} />} />
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
                  <ReferenceLine y={todayOrder.count} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
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
