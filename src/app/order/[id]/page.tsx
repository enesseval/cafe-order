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
import Unauthorized from "@/components/Unauthorized";
import { renderLastActivity, renderStatusBadge } from "../../../components/RenderTSXs";

function Order() {
   const { id } = useParams();

   const { data, loading, error } = useSubscription(GET_ORDER, { variables: { id } });

   if (!data || data.orders.length === 0) return <Unauthorized />;

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
                     <div key={`div-${item.id}`} className={`grid grid-cols-3 p-2 ${index === data.orders[0].order_items.length - 1 ? "" : "border-b"}`}>
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
