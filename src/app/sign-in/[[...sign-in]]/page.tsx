"use client";

import { SignIn, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Auth() {
   const { isSignedIn } = useAuth();
   const { user } = useUser();
   const router = useRouter();

   useEffect(() => {
      if (isSignedIn) {
         const userRole = user?.publicMetadata.role;

         switch (userRole) {
            case "admin":
               router.push("/dashboard");
               break;
            case "kitchen":
               router.push("/kitchen");
               break;
            case "waiter":
               router.push("/waiter");
               break;
            case "table":
               router.push("/menu");
               break;
         }
      }
   }, [isSignedIn, router, user]);

   return (
      <div>
         <SignIn />
      </div>
   );
}

export default Auth;
