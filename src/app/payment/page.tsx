"use client";

import { useShopbag } from "@/components/context/ShopbagContext";
import Navbar from "@/components/Navbar";
import React from "react";

function Payment() {
   const { items } = useShopbag();

   console.log(items);
   return (
      <div>
         <Navbar />
      </div>
   );
}

export default Payment;
