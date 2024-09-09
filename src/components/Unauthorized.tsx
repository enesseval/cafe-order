import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";

function Unauthorized() {
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black dark:bg-white">
         <div className="w-80 h-80 bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(/opps.png)` }}>
            <div className="absolute bottom-0">
               <h1 className="text-white dark:text-black text-xl">Sanırım yanlış bir yere geldiniz</h1>
               <div className="flex justify-evenly mt-5">
                  <Button
                     variant={"outline"}
                     onClick={() => {
                        setLoading(true);
                        router.push("/");
                     }}
                  >
                     {loading ? <FaSpinner className="animate-spin w-6 h-6" /> : "Menü"}
                  </Button>
                  <Button
                     variant={"outline"}
                     onClick={() => {
                        setLoading(true);
                        router.push("/sign-in");
                     }}
                  >
                     {loading ? <FaSpinner className="animate-spin w-6 h-6" /> : "Giriş yap"}
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Unauthorized;
