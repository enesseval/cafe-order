import { tr } from "date-fns/locale";
import { useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { eachDayOfInterval, format, subMonths } from "date-fns";

import { Orders } from "@/gql/graphql";
import { GET_THREE_MONTH_ORDERS } from "@/queries/queries";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis, ReferenceLine } from "recharts";
import { Skeleton } from "./ui/skeleton";
import { MdErrorOutline } from "react-icons/md";

interface ChartData {
   date: string;
   count: number;
   price: number;
}

function Chart() {
   const [chartData, setChartData] = useState<ChartData[]>();
   const [averageCount, setAverageCount] = useState(0);
   const [averagePrice, setAveragePrice] = useState(0);
   const { data, loading, error } = useSubscription(GET_THREE_MONTH_ORDERS, { variables: { date: format(subMonths(new Date(), 1), "yyyy-MM-dd") } });

   useEffect(() => {
      if (data && !loading && !error) {
         const groupedData: { [key: string]: { count: number; price: number } } = data.orders.reduce((acc: any, order: Orders) => {
            const date = new Date(order.created_at).toISOString().split("T")[0];

            if (acc[date]) {
               acc[date].count += 1;
               acc[date].price += order.order_price;
            } else {
               acc[date] = { count: 1, price: order.order_price };
            }

            return acc;
         }, {});

         const finalData = eachDayOfInterval({
            start: subMonths(new Date(), 1),
            end: new Date(),
         }).map((date) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            return {
               date: formattedDate,
               count: groupedData[formattedDate]?.count || 0,
               price: groupedData[formattedDate]?.price || 0,
            };
         });

         const total = finalData.reduce(
            (acc, current) => {
               acc.totalCount += current.count;
               acc.totalPrice += current.price;
               return acc;
            },
            { totalCount: 0, totalPrice: 0 }
         );

         setAverageCount(total.totalCount / finalData.length);
         setAveragePrice(total.totalPrice / finalData.length);
         setChartData(finalData);
      }
   }, [data, loading, error]);

   const chartConfig = {
      count: {
         label: "Sipariş Sayısı",
         color: "red",
      },
      price: {
         label: "Sipariş Tutarı",
         color: "blue",
      },
   };

   if (loading) return <Skeleton className="col-span-1 sm:col-span-2 lg:col-span-3 aspect-video" />;
   if (error)
      return (
         <Card className="col-span-1 sm:col-span-2 lg:col-span-3 aspect-video flex items-center justify-center">
            <MdErrorOutline className="w-14 h-14" />
         </Card>
      );

   return (
      <Card className="col-span-1 sm:col-span-2 lg:col-span-3">
         <CardHeader>
            <CardTitle>Aylık Grafik</CardTitle>
            <CardDescription>
               {format(subMonths(new Date(), 1), "MMMM", { locale: tr })} - {format(new Date(), "MMMM", { locale: tr })}
            </CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="date"
                     tickLine={false}
                     tickMargin={10}
                     axisLine={false}
                     tickFormatter={(val) => {
                        return new Date(val).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
                     }}
                  />
                  <YAxis yAxisId="count" dataKey="count" axisLine={false} tickLine={false} orientation="right" label={{ value: "Sipariş Sayısı", angle: -90, position: "insideRight" }} />
                  <YAxis yAxisId="price" dataKey="price" axisLine={false} tickLine={false} label={{ value: "Sipariş Tutarı", angle: -90, position: "insideLeft" }} />
                  <ChartTooltip
                     cursor={false}
                     content={
                        <ChartTooltipContent
                           indicator="dashed"
                           labelFormatter={(val) => {
                              return new Date(val).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
                           }}
                        />
                     }
                  />
                  <Bar yAxisId="count" dataKey="count" fill="hsl(var(--chart-5))" radius={5} activeBar={<Rectangle fillOpacity={0.8} />} />
                  <Bar yAxisId="price" dataKey="price" fill="hsl(var(--chart-4))" radius={5} activeBar={<Rectangle fillOpacity={0.8} />} />
                  {averageCount !== 0 && (
                     <ReferenceLine
                        stroke="hsl(var(--chart-1))"
                        yAxisId="count"
                        key={averageCount}
                        y={averageCount}
                        label={{
                           fontWeight: 600,
                           value: `Ortalama Sipariş Sayısı ${Math.round(averageCount)}`,
                           position: "insideTopRight",
                           offset: -20,
                           fill: "hsl(var(--chart-1))",
                        }}
                     />
                  )}
                  {averagePrice !== 0 && (
                     <ReferenceLine
                        stroke="hsl(var(--chart-2))"
                        yAxisId="price"
                        y={averagePrice}
                        label={{
                           fontWeight: 600,
                           value: `Ortalama Sipariş Fiyatı ${Math.round(averagePrice)}`,
                           position: "insideTopLeft",
                           fill: "hsl(var(--chart-2))",
                        }}
                     />
                  )}
               </BarChart>
            </ChartContainer>
         </CardContent>
      </Card>
   );
}

export default Chart;
