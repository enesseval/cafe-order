import { IoClose } from "react-icons/io5";
import { useMutation } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Foods } from "@/gql/graphql";
import { Button } from "@/components/ui/button";
import { DELETE_FOOD } from "@/queries/queries";
import { useToast } from "@/components/ui/use-toast";

const DeleteFood: React.FC<{ row: any }> = ({ row }) => {
   const { toast } = useToast();
   const id = row.original.id;
   const [deleteFood] = useMutation(DELETE_FOOD, {
      onCompleted: () => {
         toast({
            title: "Yemek başarıyla silindi",
         });
      },
      onError: (error) => {
         toast({
            title: "Yemek silinirken bir hata oluştu",
            description: error.message,
            variant: "destructive",
         });
      },
   });
   return (
      <Button onClick={() => deleteFood({ variables: { id } })} variant={"destructive"} size={"icon"}>
         <IoClose className="w-6 h-6" />
      </Button>
   );
};

export const columns: ColumnDef<Foods>[] = [
   {
      accessorKey: "food_name",
      header: "Yemek adı",
   },
   {
      header: "Yemek açıklaması",
      cell: ({ row, table }) => {
         return (
            <div className="relative">
               <span className="short">{row.original.food_description.length!! > 30 ? row.original.food_description?.slice(0, 30) + "..." : row.original.food_description}</span>
               {row.original.food_description?.length! > 30 && (
                  <div
                     className={cn(
                        "long hidden absolute bg-background bg-cover bg-no-repeat bg-center border border-gray-300 rounded-lg p-3 w-64 z-10 -left-10",
                        table.getRowModel().rows.length > 10 && table.getRowModel().rows.length - 5 <= row.index && "-top-24"
                     )}
                  >
                     {row.original.food_description}
                  </div>
               )}
            </div>
         );
      },
   },
   {
      header: "Yemek resmi",
      cell: ({ row, table }) => {
         return (
            <div className="relative">
               <span className="short cursor-pointer">{row.original.food_image.slice(0, 20) + "..."}</span>
               <div
                  style={{ backgroundImage: `url(${row.original.food_image})` }}
                  className={cn(
                     "long hidden absolute bg-background bg-cover bg-no-repeat bg-center border border-gray-300 rounded-lg p-3 w-64 aspect-square z-10 -left-10",
                     table.getRowModel().rows.length - 5 <= row.index && "-top-[260px]"
                  )}
               />
            </div>
         );
      },
   },
   {
      header: "Yemek fiyatı",
      accessorKey: "food_price",
   },
   {
      header: "Yemek kategorisi",
      accessorKey: "category.category_name",
   },
   {
      header: "Yemeği sil",
      cell: DeleteFood,
   },
];
