import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
   return (
      <nav className="relative h-48 md:h-96 bg-no-repeat bg-cover flex items-center justify-center bg-menu-bg before:bg-slate-800/50 before:w-full before:h-full before:absolute">
         <div className="absolute top-2 right-2 flex items-center space-x-2">
            <ThemeSwitcher />
         </div>
         <h1 className="z-10 text-6xl font-bold text-white">Cafe XYZ</h1>
      </nav>
   );
}

export default Navbar;
