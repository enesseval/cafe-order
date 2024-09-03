"use client";

import { useShopbag } from "@/components/context/ShopbagContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

function Payment() {
   const { items, addItem, removeItem, totalPrice } = useShopbag();

   const paymentProcess = async () => {
      try {
         await fetch("/api/payment", {
            headers: {
               "Content-Type": "application/json",
            },
         })
            .then((res) => console.log(res))
            .catch((e) => console.log("Errooooooor: ", (e as Error).message));
      } catch (error) {
         console.log("Error burda: ", error);
      }
   };

   console.log(items);
   return (
      <div>
         <Navbar />
         <div className="grid gap-1 grid-cols-1 lg:grid-cols-2 w-11/12 max-w-[1100px] my-5 mx-auto">
            <div>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Yemek adı</TableHead>
                        <TableHead>Yemek fiyatı</TableHead>
                        <TableHead className="text-center">Yemek adedi</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {items.map((item) => (
                        <TableRow key={item.id}>
                           <TableCell>
                              <div className="w-20 h-20 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.image})` }}></div>
                           </TableCell>
                           <TableCell>{item.name}</TableCell>
                           <TableCell>{item.price}</TableCell>
                           <TableCell className="flex items-center justify-center min-h-[97px]">
                              <div className="grid grid-cols-3 items-center">
                                 <div className="col-span-1">
                                    <Button onClick={() => removeItem(item.id)} size={"icon"} variant={"ghost"}>
                                       <FaMinus />
                                    </Button>
                                 </div>
                                 <div className="flex items-center justify-center border-x border-black dark:border-white col-span-1">
                                    <p className="text-center">{item.quantity}</p>
                                 </div>
                                 <div className="col-span-1">
                                    <Button onClick={() => addItem({ id: item.id, name: item.name, image: item.image, price: item.price, quantity: 1 })} size={"icon"} variant={"ghost"}>
                                       <FaPlus />
                                    </Button>
                                 </div>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
                  <TableFooter>
                     <TableRow>
                        <TableCell colSpan={4}>Toplam</TableCell>
                        <TableCell className="text-right">{totalPrice} ₺</TableCell>
                     </TableRow>
                  </TableFooter>
               </Table>
            </div>
            <div>
               <Button onClick={paymentProcess} variant={"destructive"}>
                  ÖDE
               </Button>
            </div>
         </div>
      </div>
   );
}

export default Payment;
