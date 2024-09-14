import React from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

import { Button } from "./ui/button";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
   const user = useUser();
   const router = useRouter();

   return (
      <nav className="relative h-48 md:h-96 bg-no-repeat bg-cover flex items-center justify-center bg-menu-bg before:bg-slate-800/50 before:w-full before:h-full before:absolute">
         <div className="absolute top-2 right-2 flex items-center space-x-2">
            {user.isLoaded && user.isSignedIn && user.user && user.user.publicMetadata.role === "admin" && (
               <div className="flex items-center">
                  <Button onClick={() => router.push("/dashboard")} variant={"ghost"} className="mr-2">
                     Dashboard
                  </Button>
                  <UserButton />
               </div>
            )}

            <ThemeSwitcher />
         </div>
         <h1 className="z-10 text-6xl font-bold text-white">Cafe XYZ</h1>
      </nav>
   );
}

export default Navbar;
