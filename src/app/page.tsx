"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
   const { isSignedIn } = useAuth();
   const { user } = useUser();
   const { getToken } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!isSignedIn) router.push("/sign-in");

      const token = async () => {
         await getToken({ template: "hasura" })
            .then((res) => {
               if (res) localStorage.setItem("token", res);
            })
            .catch((e) => console.log(e));
      };

      token();

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
   }, [isSignedIn, user, router, getToken]);

   return <div></div>;
}
