"use client";

import Unauthorized from "@/components/Unauthorized";
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

   return <div>dashboard main page</div>;
}

export default Dashboard;
