"use client";

import { z } from "zod";
import { nanoid } from "nanoid";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSubscription } from "@apollo/client";

import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Categories } from "@/gql/graphql";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORIES } from "@/queries/queries";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function Categories() {
   const { toast } = useToast();
   const [dialogOpen, setDialogOpen] = useState(false);

   const { data, loading } = useSubscription(GET_ALL_CATEGORIES);
   const [addCategory, { loading: addCategoryLoading }] = useMutation(ADD_CATEGORY, {
      onCompleted: () => {
         toast({
            title: "Kategori başarıyla eklendi",
         });
         setDialogOpen(false);
      },
      onError: (error) => {
         toast({
            title: "Kategori eklenirken bir hata oluştu",
            description: error.message,
            variant: "destructive",
         });
      },
   });
   const [deleteCategory] = useMutation(DELETE_CATEGORY, {
      onCompleted: () => {
         toast({
            title: "Kategori başarıyla silindi",
         });
         setDialogOpen(false);
      },
      onError: (error) => {
         toast({
            title: "Kategori silinirkne bir hata oluştu",
            description: error.message,
            variant: "destructive",
         });
      },
   });

   const formSchema = z.object({
      categoryName: z.string({ required_error: "Lütfen kategori adı giriniz" }).min(3, { message: "Kategori adı en az 3 harf içermelidir" }),
   });

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         categoryName: "",
      },
   });

   useEffect(() => {
      if (!dialogOpen) form.reset();
   }, [dialogOpen, form]);

   const handleAddCategory = async (values: z.infer<typeof formSchema>) => {
      const id = nanoid();
      await addCategory({ variables: { id, category_name: values.categoryName } });
   };

   const handleDeleteCategory = async (id: string) => {
      await deleteCategory({ variables: { id } });
   };

   if (loading) return <Loading />;

   return (
      <div>
         <div className="flex w-full p-3 justify-end">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
               <DialogTrigger asChild>
                  <Button variant={"outline"}>Kategori Ekle</Button>
               </DialogTrigger>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Kategori ekle</DialogTitle>
                     <DialogDescription>Kategori eklemek için bilgileri doldurunuz</DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                     <form className="space-y-4" onSubmit={form.handleSubmit(handleAddCategory)}>
                        <FormField
                           control={form.control}
                           name="categoryName"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input placeholder="Kategori adı giriniz" onChange={field.onChange} />
                                 </FormControl>
                              </FormItem>
                           )}
                        />
                        <DialogFooter>
                           <Button size={addCategoryLoading ? "icon" : "default"} variant={"outline"} type="submit">
                              {addCategoryLoading ? <PiSpinner className="animate-spin w-6 h-6" /> : "Ekle"}
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
                     <TableHead>Kategori adı</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {data && data.categories.length === 0 && (
                     <TableRow>
                        <TableCell className="text-center">No results.</TableCell>
                     </TableRow>
                  )}
                  {data &&
                     data.categories.map((category: Categories) => (
                        <TableRow key={category.id}>
                           <TableCell>{category.category_name}</TableCell>
                           <TableCell className="text-right">
                              <Button variant={"destructive"} size={"icon"} onClick={() => handleDeleteCategory(category.id)}>
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

export default Categories;
