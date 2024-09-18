"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import WeeklyCard from "@/components/WeeklyCard";
import TodayOrders from "@/components/TodayOrders";
import Unauthorized from "@/components/Unauthorized";
import PerformanceCard from "@/components/PerformanceCard";
import Chart from "@/components/Chart";

function Dashboard() {
   const user = useUser();
   const router = useRouter();

   useEffect(() => {
      if (user.user && user.isLoaded && user.isSignedIn) {
         switch (user.user.publicMetadata.role) {
            case "kitchen":
               router.push("/kitchen");
               break;
            case "waiter":
               router.push("/waiter");
               break;
         }
      }
   }, [user, router]);

   if (user.isLoaded && !user.isSignedIn && !user.user) return <Unauthorized />;

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 col-span-5 gap-1 p-3">
         <WeeklyCard />
         <PerformanceCard />
         <TodayOrders />
         <Chart />
      </div>
   );
}

export default Dashboard;
