"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Unauthorized from "@/components/Unauthorized";
import ThemeSwitcher from "@/components/ThemeSwitcher";

import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { IoMenu, IoClose, IoRadioButtonOn, IoRadioButtonOff } from "react-icons/io5";

function DashboardLayout({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const user = useUser();
   const pathname = usePathname();
   const [isMobile, setIsMobile] = useState(false);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 768) {
            setIsMobile(true);
            setIsSidebarOpen(false);
         } else {
            setIsMobile(false);
            setIsSidebarOpen(true);
         }
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   if (user.isLoaded && !user.isSignedIn && !user.user) return <Unauthorized />;

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   const menuItems = [
      { name: "İstatistikler", path: "/dashboard", icon: IoRadioButtonOff },
      { name: "Kullanıcılar", path: "/dashboard/users", icon: IoRadioButtonOff },
      { name: "Masalar", path: "/dashboard/tables", icon: IoRadioButtonOff },
      { name: "Menü", path: "/dashboard/menu", icon: IoRadioButtonOff },
      { name: "Kategoriler", path: "/dashboard/categories", icon: IoRadioButtonOff },
      { name: "Siparişler", path: "/dashboard/orders", icon: IoRadioButtonOff },
   ];

   return (
      <div>
         <nav className="w-full bg-transparent flex items-center justify-between px-2 h-14 border-b box-border">
            <div className="flex items-center">
               <Button size={"icon"} variant={"outline"} onClick={() => toggleSidebar()} className={cn(!isMobile ? "hidden" : "mr-2")}>
                  {isSidebarOpen ? <IoClose className="w-8 h-8 animate-toggle" /> : <IoMenu className="w-8 h-8 animate-toggle" />}
               </Button>

               <div>
                  <h1 className="text-xl">Kafe Sipariş</h1>
               </div>
            </div>
            <ThemeSwitcher />
         </nav>

         <div className="grid grid-cols-5 min-h-screen relative">
            <div
               className={cn(
                  "col-span-5 md:col-span-1 w-full min-h-screen left-0 z-50 transition-all duration-500 ease-in-out border-r",
                  !isSidebarOpen && "-left-full -z-10",
                  isMobile && "relative col-span-5 sm:col-span-2"
               )}
            >
               <div className="w-10/12 mx-auto flex flex-col items-center space-y-2 p-2 border-b">
                  {user.user ? (
                     <>
                        <UserButton />
                        <span className="text-center">Hoşgeldin {user?.user?.username}</span>
                     </>
                  ) : (
                     <>
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-8/12 h-4" />
                     </>
                  )}
               </div>
               <div className="w-10/12 mx-auto p-2">
                  <ul className="space-y-2">
                     {menuItems.map((item) => {
                        const Icon = pathname === item.path ? IoRadioButtonOn : item.icon;
                        return (
                           <li
                              key={item.path}
                              className={cn("flex items-center space-x-1 cursor-pointer hover:underline", pathname === item.path && "underline")}
                              onClick={() => {
                                 if (isMobile) setIsSidebarOpen(false);
                                 router.push(item.path);
                              }}
                           >
                              <Icon />
                              <p>{item.name}</p>
                           </li>
                        );
                     })}
                  </ul>
               </div>
            </div>
            <div className={cn("col-span-5 md:col-span-4 w-full min-h-screen", isMobile && "absolute")}>{children}</div>
         </div>
      </div>
   );
}

export default DashboardLayout;
