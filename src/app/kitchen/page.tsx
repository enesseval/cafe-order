"use client";

import React, { useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation, useSubscription } from "@apollo/client";

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
import Unauthorized from "@/components/Unauthorized";
import { renderLastActivity } from "@/components/RenderTSXs";
import { GET_ALL_ORDERS, UPDATE_ORDER } from "@/queries/queries";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function Kitchen() {
   const user = useUser();
   const router = useRouter();
   const { toast } = useToast();
   const { data, loading, error } = useSubscription(GET_ALL_ORDERS, { variables: { where: { _or: [{ status: { _eq: "received" } }, { status: { _eq: "preparing" } }] } } });
   const [updateOrder] = useMutation(UPDATE_ORDER, {
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

   useEffect(() => {
      if (user.user && user.isLoaded && user.isSignedIn) {
         switch (user.user.publicMetadata.role) {
            case "kitchen":
               router.push("/kitchen");
               break;
            case "waiter":
               router.push("/waiter");
               break;
         }
      }
   }, [user, router]);

   if (user.isLoaded && !user.isSignedIn && !user.user) return <Unauthorized />;

   const handleOrderReady = async (id: string, status: string) => {
      console.log(status);
      if (status === "received") {
         await updateOrder({ variables: { id, status: "preparing", updated_at: new Date() } });
      } else if (status === "preparing") {
         await updateOrder({ variables: { id, status: "ready", updated_at: new Date() } });
      }
   };

   return (
      <div className="w-11/12 mx-auto">
         <div className="flex justify-center my-5 border-b">
            <h1 className="text-4xl font-bold">Cafe XYZ</h1>
            <UserButton />
         </div>
         {loading && (
            <div className="flex justify-center h-[500px]">
               <Loading />
            </div>
         )}
         {data && !loading && !error && <div className="flex justify-center my-10">Bekleyen sipariş: {data.orders.length}</div>}
         {data && !loading && !error && (
            <Accordion type="multiple" className="w-full md:w-6/12 md:mx-auto">
               {data.orders.map((order: Orders) => (
                  <div key={`container-${order.id}`} className="flex gap-5">
                     <AccordionItem className="w-full" value={order.id}>
                        <AccordionTrigger>{order.table?.table_name}</AccordionTrigger>
                        <AccordionContent>
                           <div className="flex justify-end">
                              <p className="text-muted-foreground">{renderLastActivity(order.updated_at)}</p>
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
                                       <TableRow key={`food-${item.food.id}`}>
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
                        {order.status === "received" ? (
                           <div>
                              <Button onClick={() => handleOrderReady(order.id, order.status)} variant={"ghost"} className="w-full bg-yellow-600">
                                 Hazırla !
                              </Button>
                           </div>
                        ) : (
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                 <Button variant={"ghost"} className="w-full bg-green-600">
                                    Hazır !
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
                        )}
                     </div>
                  </div>
               ))}
            </Accordion>
         )}
      </div>
   );
}

export default Kitchen;
