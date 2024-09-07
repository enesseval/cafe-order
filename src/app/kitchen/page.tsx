"use client";

import React from "react";
import { tr } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useSubscription } from "@apollo/client";

import { cn } from "@/lib/utils";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Order_Items, Orders } from "@/gql/graphql";
import { useToast } from "@/components/ui/use-toast";
import { GET_KITCHEN_ORDERS, UPDATE_ORDER_KITCHEN } from "@/queries/queries";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function Kitchen() {
   const { toast } = useToast();
   const { data, loading } = useSubscription(GET_KITCHEN_ORDERS);
   const [updateOrder] = useMutation(UPDATE_ORDER_KITCHEN, {
      onCompleted: () => {
         toast({
            title: "Sipariş durumu başarıyla güncellendi",
         });
      },
      onError: (error) => {
         toast({
            title: "Sipariş durumu güncellenirken bir hata oluştu",
            description: error.message,
            variant: "destructive",
         });
      },
   });

   const renderLastActivity = (date: string) => {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: tr });
   };

   const handleOrderReady = async (id: string, status: string) => {
      console.log(status);
      if (status === "received") {
         await updateOrder({ variables: { id, status: "preparing" } });
      } else if (status === "preparing") {
         await updateOrder({ variables: { id, status: "ready" } });
      }
   };

   return (
      <div className="w-11/12 mx-auto">
         <div className="flex justify-center my-5 border-b">
            <h1 className="text-4xl font-bold">Cafe XYZ</h1>
         </div>
         {loading && (
            <div className="flex justify-center h-[500px]">
               <Loading />
            </div>
         )}
         {data && !loading && <div className="flex justify-center my-10">Bekleyen sipariş: {data.orders.length}</div>}
         {data && !loading && (
            <Accordion type="multiple" className="w-full md:w-6/12 md:mx-auto">
               {data.orders.map((order: Orders) => (
                  <div key={order.id} className="flex gap-5">
                     <AccordionItem className="w-full" value={order.id}>
                        <AccordionTrigger>{order.table?.table_name}</AccordionTrigger>
                        <AccordionContent>
                           <div className="flex justify-end">
                              <p className="text-muted-foreground">{renderLastActivity(order.created_at)}</p>
                           </div>
                           <div>
                              <Table>
                                 <TableHeader>
                                    <TableRow>
                                       <TableHead>Yemek adı</TableHead>
                                       <TableHead className="text-center">Adet</TableHead>
                                    </TableRow>
                                 </TableHeader>
                                 <TableBody>
                                    {order.order_items.map((item: Order_Items) => (
                                       <TableRow key={item.id}>
                                          <TableCell>{item.food.food_name}</TableCell>
                                          <TableCell className="text-center">{item.food_piece}</TableCell>
                                       </TableRow>
                                    ))}
                                 </TableBody>
                              </Table>
                           </div>
                           <div className="border p-3 my-3 rounded-md">
                              <p>
                                 Sipariş notu: <br />
                                 <span className="text-muted-foreground">{order.order_description}</span>
                              </p>
                           </div>
                        </AccordionContent>
                     </AccordionItem>
                     <div className="mt-2.5 w-28">
                        <AlertDialog>
                           <AlertDialogTrigger asChild>
                              <Button variant={"ghost"} className={cn("w-full", order.status === "received" ? "bg-yellow-600" : "bg-green-600")}>
                                 {order.status === "received" ? "Hazırla !" : "Hazır !"}
                              </Button>
                           </AlertDialogTrigger>
                           <AlertDialogContent>
                              <AlertDialogHeader>
                                 <AlertDialogTitle>Sipariş hazır, onaylıyor musunuz ?</AlertDialogTitle>
                                 <AlertDialogDescription>Bu işlem geri alınamaz, emin misiniz ?</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                 <AlertDialogCancel>İptal</AlertDialogCancel>
                                 <AlertDialogAction onClick={() => handleOrderReady(order.id, order.status)}>Onaylıyorum</AlertDialogAction>
                              </AlertDialogFooter>
                           </AlertDialogContent>
                        </AlertDialog>
                     </div>
                  </div>
               ))}
            </Accordion>
         )}
      </div>
   );
}

export default Kitchen;
