"use client";

import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Orders } from "@/gql/graphql";
import { renderLastActivity, renderStatusBadge } from "@/components/RenderTSXs";

export const columns: ColumnDef<Orders>[] = [
   {
      accessorKey: "status",
      header: "Sipariş durumu",
      cell: ({ row }) => renderStatusBadge(row.original.status),
   },
   {
      accessorKey: "table.table_name",
      header: "Masa",
   },
   {
      header: "Ürün Sayısı",
      cell: ({ row }) => row.original.order_items.length,
   },
   {
      header: "Sipariş notu",
      cell: ({ row, table }) => {
         return (
            <div className="relative">
               <span className="short">{row.original.order_description?.length! > 30 ? row.original.order_description?.slice(0, 30) + "..." : row.original.order_description}</span>
               {row.original.order_description?.length! > 30 && (
                  <div
                     className={cn(
                        "long hidden absolute bg-background bg-cover bg-no-repeat bg-center border border-gray-300 rounded-lg p-3 w-64 z-10 -left-10",
                        table.getRowModel().rows.length > 10 && table.getRowModel().rows.length - 5 <= row.index && "-top-24"
                     )}
                  >
                     {row.original.order_description}
                  </div>
               )}
            </div>
         );
      },
   },
   {
      header: "Son güncelleme",
      cell: ({ row }) => renderLastActivity(row.original.updated_at),
   },
];
