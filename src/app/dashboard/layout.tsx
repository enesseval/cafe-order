"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMenu, IoClose, IoRadioButtonOn, IoRadioButtonOff } from "react-icons/io5";

function DashboardLayout({ children }: { children: React.ReactNode }) {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(false);
   const { user } = useUser();
   const pathname = usePathname();
   const router = useRouter();

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

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   const menuItems = [
      { name: "İstatistikler", path: "/dashboard", icon: IoRadioButtonOff },
      { name: "Kullanıcılar", path: "/dashboard/users", icon: IoRadioButtonOff },
      { name: "Masalar", path: "/dashboard/tables", icon: IoRadioButtonOff },
      { name: "Siparişler", path: "/dashboard/orders", icon: IoRadioButtonOff },
      { name: "Menü", path: "/dashboard/menu", icon: IoRadioButtonOff },
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

         <div className="grid grid-cols-5 gap-1 min-h-screen relative">
            <div
               className={cn(
                  "col-span-5 md:col-span-1 w-full min-h-screen left-0 z-50 bg-zinc-100 dark:bg-zinc-900 transition-all duration-500 ease-in-out ",
                  !isSidebarOpen && "-left-full -z-10",
                  isMobile && "relative col-span-5 sm:col-span-2"
               )}
            >
               <div className="w-10/12 mx-auto flex flex-col items-center space-y-2 p-2 border-b">
                  <UserButton />
                  <span className="text-center">Hoşgeldin {user?.username}</span>
               </div>
               <div className="w-10/12 mx-auto p-2">
                  <ul className="space-y-2">
                     {menuItems.map((item) => {
                        console.log(item.path === pathname);
                        const Icon = pathname === item.path ? IoRadioButtonOn : item.icon;
                        return (
                           <li
                              key={item.path}
                              className="flex items-center space-x-1 cursor-pointer hover:underline"
                              onClick={() => {
                                 setIsSidebarOpen(false);
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
