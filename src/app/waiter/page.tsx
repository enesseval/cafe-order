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
import { Orders } from "@/gql/graphql";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { renderLastActivity } from "../../components/RenderTSXs";
import Unauthorized from "@/components/Unauthorized";
import { useToast } from "@/components/ui/use-toast";
import { GET_ALL_ORDERS, UPDATE_ORDER } from "@/queries/queries";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function Waiter() {
   const user = useUser();
   const router = useRouter();
   const { toast } = useToast();
   const { data, loading, error } = useSubscription(GET_ALL_ORDERS, { variables: { where: { status: { _eq: "ready" } } } });
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

   const handleOrderComplate = async (id: string) => {
      await updateOrder({ variables: { id, status: "delivered", updated_at: new Date() } });
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
            <Table className="w-full md:w-6/12 md:mx-auto">
               <TableHeader>
                  <TableRow>
                     <TableHead>Masa</TableHead>
                     <TableHead>Son güncelleme</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {data.orders.map((order: Orders) => (
                     <TableRow key={`table-${order.id}`}>
                        <TableCell>{order.table?.table_name}</TableCell>
                        <TableCell>{renderLastActivity(order.updated_at)}</TableCell>
                        <TableCell className="text-right">
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                 <Button variant={"ghost"} className="bg-blue-600">
                                    Teslim et !
                                 </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                 <AlertDialogHeader>
                                    <AlertDialogTitle>Sipariş teslim ettiniz, onaylıyor musunuz ?</AlertDialogTitle>
                                    <AlertDialogDescription>Bu işlem geri alınamaz, emin misiniz ?</AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                    <AlertDialogCancel>İptal</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleOrderComplate(order.id)}>Onaylıyorum</AlertDialogAction>
                                 </AlertDialogFooter>
                              </AlertDialogContent>
                           </AlertDialog>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         )}
      </div>
   );
}

export default Waiter;
