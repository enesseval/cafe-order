"use client";

import { z } from "zod";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { PiSpinner } from "react-icons/pi";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSubscription } from "@apollo/client";

import Loading from "@/components/Loading";
import type { Tables } from "@/gql/graphql";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ADD_TABLE, DELETE_TABLE, GET_ALL_TABLES } from "@/queries/queries";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddTableMutation, AddTableMutationVariables, DeleteTableMutation, DeleteTableMutationVariables } from "@/gql/graphql";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function Tables() {
   const { toast } = useToast();
   const [dialogOpen, setDialogOpen] = useState(false);

   const { data, loading } = useSubscription(GET_ALL_TABLES);
   const [addTable, { loading: addTableLoading }] = useMutation<AddTableMutation, AddTableMutationVariables>(ADD_TABLE, {
      onCompleted: () => {
         toast({
            title: "Masa başarıyla eklendi",
         });
         setDialogOpen(false);
      },
      onError: (error) => {
         toast({
            title: "Masa eklenirken bir hata oluştu",
            description: error.message,
            variant: "destructive",
         });
      },
   });
   const [deleteTable] = useMutation<DeleteTableMutation, DeleteTableMutationVariables>(DELETE_TABLE, {
      onCompleted: () => {
         toast({
            title: "Masa başarıyla silindi",
         });
      },
      onError: (error) => {
         toast({
            title: "Masa silinirken bir hata oluştu",
            description: error.message,
            variant: "destructive",
         });
      },
   });

   const formSchema = z.object({
      tableName: z.string({ required_error: "Lütfen masa adı giriniz" }).min(3, { message: "Masa adı en az 3 karakter olmalı" }),
   });

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         tableName: "",
      },
   });

   useEffect(() => {
      if (!dialogOpen) form.reset();
   }, [dialogOpen, form]);

   const handleAddTable = async (values: z.infer<typeof formSchema>) => {
      const id = nanoid();
      await addTable({ variables: { id, table_name: values.tableName } });
   };

   const handleDeleteTable = async (id: string) => {
      await deleteTable({ variables: { id } });
   };

   if (loading) return <Loading />;

   return (
      <div>
         <div className="flex w-full p-3 justify-end">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
               <DialogTrigger asChild>
                  <Button variant={"outline"}>Masa ekle</Button>
               </DialogTrigger>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Masa ekle</DialogTitle>
                     <DialogDescription>Masa eklemek için bilgileri doldurunuz</DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                     <form className="space-y-4" onSubmit={form.handleSubmit(handleAddTable)}>
                        <FormField
                           control={form.control}
                           name="tableName"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input placeholder="Masa adı" onChange={field.onChange} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <DialogFooter>
                           <Button size={addTableLoading ? "icon" : "default"} variant={"outline"} type="submit">
                              {addTableLoading ? <PiSpinner className="animate-spin w-6 h-6" /> : "Ekle"}
                           </Button>
                        </DialogFooter>
                     </form>
                  </Form>
               </DialogContent>
            </Dialog>
         </div>
         <div className="p-2 w-8/12 mx-auto">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Masa adı</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {data &&
                     data.tables.map((table: Tables) => (
                        <TableRow key={table.id}>
                           <TableCell>{table.table_name}</TableCell>
                           <TableCell className="text-right">
                              <Button variant={"destructive"} size={"icon"} onClick={() => handleDeleteTable(table.id)}>
                                 <IoClose />
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}

export default Tables;
