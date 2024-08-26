"use client";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { IoMoon } from "react-icons/io5";
import { PiSunFill } from "react-icons/pi";
import React, { useEffect, useState } from "react";

function ThemeSwitcher() {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   const changeTheme = () => {
      if (theme === "light") setTheme("dark");
      else setTheme("light");
   };

   if (!mounted) return null;

   return (
      <Button size={"icon"} variant={"outline"} onClick={() => changeTheme()}>
         {theme === "dark" ? <PiSunFill className="w-6 h-6 animate-wiggle" /> : <IoMoon className="w-6 h-6 animate-wiggle" />}
      </Button>
   );
}

export default ThemeSwitcher;
