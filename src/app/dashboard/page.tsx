"use client";

import PerformanceCard from "@/components/PerformanceCard";
import Unauthorized from "@/components/Unauthorized";
import WeeklyCard from "@/components/WeeklyCard";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-span-5 gap-1 p-3">
         <WeeklyCard />
         <PerformanceCard />
      </div>
   );
}

export default Dashboard;
