"use client";

import { tr } from "date-fns/locale";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useSubscription } from "@apollo/client";

import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { Order_Items } from "@/gql/graphql";
import { Badge } from "@/components/ui/badge";
import { GET_ORDER } from "@/queries/queries";

function Order() {
   const { id } = useParams();

   const { data, loading, error } = useSubscription(GET_ORDER, { variables: { id } });

   console.log(data);

   const renderStatusBadge = (status: string) => {
      switch (status) {
         case "received":
            return <Badge className="bg-blue-500 text-white">Sipariş Alındı</Badge>;
         case "preparing":
            return <Badge className="bg-yellow-500 text-black">Hazırlanıyor</Badge>;
         case "ready":
            return <Badge className="bg-green-500 text-white">Hazırlandı</Badge>;
         case "delivered":
            return <Badge className="bg-gray-500 text-white">Teslim Edildi</Badge>;
         default:
            return <Badge className="bg-red-500 text-white">Bilinmeyen Durum</Badge>;
      }
   };

   const renderLastActivity = (updated_at: string) => {
      return formatDistanceToNow(new Date(updated_at), { addSuffix: true, locale: tr });
   };

   return (
      <div className="mb-14">
         <Navbar />
         {loading && (
            <div className="h-[500px] flex items-center">
               <Loading />
            </div>
         )}

         {data && !error && (
            <div>
               <div className="flex flex-col items-center justify-center my-5 space-y-3">
                  <h1>{data.orders.length > 0 && renderStatusBadge(data.orders[0].status)}</h1>
                  <h2>Son hareket: {renderLastActivity(data.orders[0].updated_at)}</h2>
               </div>
               <div className="w-11/12 mx-auto border">
                  {data.orders[0].order_items.map((item: Order_Items, index: number) => (
                     <div key={item.id} className={`grid grid-cols-3 p-2 ${index === data.orders[0].order_items.length - 1 ? "" : "border-b"}`}>
                        <div className="aspect-square bg-contain bg-center bg-no-repeat col-span-1" style={{ backgroundImage: `url(${item.food.food_image})`, height: "100px" }} />
                        <div className="flex items-center">
                           <p className="col-span-1">{item.food.food_name}</p>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                           <Badge>x{item.food_piece}</Badge>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}

export default Order;
