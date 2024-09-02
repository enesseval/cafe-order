import type { Foods } from "@/gql/graphql";
import React, { useState } from "react";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { FaPlus, FaMinus, FaM } from "react-icons/fa6";
import { useShopbag } from "./context/ShopbagContext";
import { cn } from "@/lib/utils";

function FoodCard({ food }: { food: Foods }) {
   const { items, addItem, removeItem, totalItems } = useShopbag();

   const itemInBag = items.find((item) => item.id === food.id);

   const handleAddClick = () => addItem({ id: food.id, name: food.food_name, image: food.food_image, price: food.food_price, quantity: 1 });

   const handleDeleteClick = () => removeItem(food.id);

   return (
      <div className="col-span-1">
         {food && (
            <Card
               className="col-span-1 relative overflow-hidden bg-cover bg-no-repeat bg-center before:bg-slate-800/20 before:w-full before:h-full before:absolute"
               style={{ backgroundImage: `url(${food.food_image})`, height: "300px" }}
            >
               <CardHeader>
                  <span className="text-lg z-10 w-fit rounded-md bg-background/50 p-2">{food.food_name}</span>
               </CardHeader>
               <div className="w-full  absolute bottom-10">
                  <div className="w-10/12 mx-auto border rounded-md bg-background/75 p-1 text-center">
                     <p>{food.food_description}</p>
                  </div>
               </div>

               <div className="absolute bottom-0 w-full h-6 m-2 flex items-center justify-end p-3 gap-1">
                  <span className="border rounded-md bg-background/75 p-1">{food.food_price} ₺</span>
                  <div className={cn("grid gap-1 bg-background/75 rounded-lg justify-center items-center", itemInBag ? "grid-cols-3" : "grid-cols-1")}>
                     <div className={cn("col-span-1", !itemInBag && "hidden")}>
                        <Button onClick={() => handleDeleteClick()} size={"icon"} variant={"ghost"}>
                           <FaMinus />
                        </Button>
                     </div>
                     <div className={cn("col-span-1 border-x border-black dark:border-white", !itemInBag && "hidden")}>
                        <p className="text-center">{totalItems}</p>
                     </div>
                     <div className="col-span-1">
                        <Button onClick={() => handleAddClick()} size={"icon"} variant={"ghost"}>
                           <FaPlus />
                        </Button>
                     </div>
                  </div>
               </div>
            </Card>
         )}
      </div>
   );
}

export default FoodCard;
