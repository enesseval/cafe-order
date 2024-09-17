import { TOTAL_TWO_DATE_RANGES_PRICE, TOTAL_THIS_WEEK_ORDERS_PRICE } from "@/queries/queries";
import { useSubscription } from "@apollo/client";
import { format, lastDayOfMonth } from "date-fns";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { MdErrorOutline } from "react-icons/md";

function getThisWeekStartDate() {
   const day = new Date();
   const calculatedDate = new Date(day.getTime() - 86400000 * 6);
   return format(calculatedDate, "yyyy-MM-dd");
}

function getLastWeekDates() {
   const endDate = new Date(getThisWeekStartDate());
   const startDate = new Date(endDate.getTime() - 86400000 * 6);
   return { startDate, endDate };
}

function thisMonthDates() {
   const today = new Date();
   const startDate = format(new Date(today.setDate(1)), "yyyy-MM-dd");
   const endDate = format(lastDayOfMonth(today), "yyyy-MM-dd");

   return { startDate, endDate };
}

function lastMonthDates() {
   const today = new Date();
   const lastMonthNumber = today.getMonth() - 1 === 0 ? 12 : today.getMonth() - 1;

   const lastMonth = today.setMonth(lastMonthNumber);
   const lastMonthFirstDay = new Date(lastMonth).setDate(1);

   const startDate = format(lastMonthFirstDay, "yyyy-MM-dd");
   const endDate = format(lastDayOfMonth(lastMonthFirstDay), "yyyy-MM-dd");

   return { startDate, endDate };
}

function PerformanceCard() {
   const [thisWeekPrice, setThisWeekPrice] = useState(0);
   const [percentageChange, setPercentageChange] = useState(0);
   const [thisMonthPrice, setThisMonthPrice] = useState(0);
   const [monthPercentageChange, setMonthPercentageChange] = useState(0);

   const {
      data: thisWeekOrdersTotalPriceData,
      loading: thisWeekOrdersTotalPriceLoading,
      error: thisWeekOrdersTotalPriceError,
   } = useSubscription(TOTAL_THIS_WEEK_ORDERS_PRICE, { variables: { date: getThisWeekStartDate() } });

   const {
      data: lastWeekOrdersTotalPriceData,
      loading: lastWeekOrdersTotalPriceLoading,
      error: lastWeekOrdersTotalPriceError,
   } = useSubscription(TOTAL_TWO_DATE_RANGES_PRICE, { variables: getLastWeekDates() });

   const { data: thisMonthData, loading: thisMonthLoading, error: thisMonthError } = useSubscription(TOTAL_TWO_DATE_RANGES_PRICE, { variables: thisMonthDates() });
   const { data: lastMonthData, loading: lastMonthLoading, error: lastMonthError } = useSubscription(TOTAL_TWO_DATE_RANGES_PRICE, { variables: lastMonthDates() });

   useEffect(() => {
      if (
         thisWeekOrdersTotalPriceData &&
         !thisWeekOrdersTotalPriceError &&
         !thisWeekOrdersTotalPriceLoading &&
         lastWeekOrdersTotalPriceData &&
         !lastWeekOrdersTotalPriceError &&
         !lastWeekOrdersTotalPriceLoading &&
         thisMonthData &&
         !thisMonthLoading &&
         !thisMonthError &&
         lastMonthData &&
         !lastMonthLoading &&
         !lastMonthError
      ) {
         setThisWeekPrice(thisWeekOrdersTotalPriceData.orders_aggregate.aggregate.sum.order_price);
         setPercentageChange(
            Math.round(
               ((thisWeekOrdersTotalPriceData.orders_aggregate.aggregate.sum.order_price - lastWeekOrdersTotalPriceData.orders_aggregate.aggregate.sum.order_price) /
                  lastWeekOrdersTotalPriceData.orders_aggregate.aggregate.sum.order_price) *
                  100
            )
         );
         setThisMonthPrice(thisMonthData.orders_aggregate.aggregate.sum.order_price);
         setMonthPercentageChange(
            Math.round(
               ((thisMonthData.orders_aggregate.aggregate.sum.order_price - lastMonthData.orders_aggregate.aggregate.sum.order_price) / lastMonthData.orders_aggregate.aggregate.sum.order_price) * 100
            )
         );
      }
   }, [
      thisWeekOrdersTotalPriceData,
      thisWeekOrdersTotalPriceError,
      thisWeekOrdersTotalPriceLoading,
      lastWeekOrdersTotalPriceData,
      lastWeekOrdersTotalPriceError,
      lastWeekOrdersTotalPriceLoading,
      thisMonthData,
      thisMonthLoading,
      thisMonthError,
      lastMonthData,
      lastMonthLoading,
      lastMonthError,
   ]);

   return (
      <div className="grid gap-1 col-span-3 md:col-span-1 grid-rows-2">
         {thisWeekOrdersTotalPriceLoading || lastWeekOrdersTotalPriceLoading ? (
            <Skeleton className="row-span-1" />
         ) : thisWeekOrdersTotalPriceError || lastWeekOrdersTotalPriceError ? (
            <Card className="row-span-1 flex items-center justify-center">
               <MdErrorOutline className="w-14 h-14" />
            </Card>
         ) : (
            <Card className="row-span-1">
               <CardHeader className="pb-2">
                  <CardDescription>Bu hafta</CardDescription>
                  <CardTitle className="text-4xl">₺{thisWeekPrice.toFixed(2)}</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className={cn("text-xs text-muted-foreground")}>
                     Bu hafta satışlar {percentageChange}% {percentageChange > 0 ? "daha iyi" : "daha kötü"}
                  </div>
               </CardContent>
               <CardFooter>
                  <Progress className="rounded-sm h-2.5" value={percentageChange > 0 ? percentageChange : percentageChange * -1} />
               </CardFooter>
            </Card>
         )}
         {thisMonthLoading || lastMonthLoading ? (
            <Skeleton className="row-span-1" />
         ) : thisMonthError || lastMonthError ? (
            <Card className="row-span-1 flex items-center justify-center">
               <MdErrorOutline className="w-14 h-14" />
            </Card>
         ) : (
            <Card className="row-span-1">
               <CardHeader className="pb-2">
                  <CardDescription>Bu ay</CardDescription>
                  <CardTitle className="text-4xl">₺{thisMonthPrice.toFixed(2)}</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className={cn("text-xs text-muted-foreground")}>
                     Bu ay satışlar {monthPercentageChange}% {monthPercentageChange > 0 ? "daha iyi" : "daha kötü"}
                  </div>
               </CardContent>
               <CardFooter>
                  <Progress className="rounded-sm h-2.5" value={monthPercentageChange > 0 ? monthPercentageChange : monthPercentageChange * -1} />
               </CardFooter>
            </Card>
         )}
      </div>
   );
}

export default PerformanceCard;
