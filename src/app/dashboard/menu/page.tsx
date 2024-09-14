"use client";

import { DataTable } from "@/components/data-table/date-table";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import type { Categories } from "@/gql/graphql";
import { ADD_FOOD, GET_ALL_CATEGORIES, GET_FOODS } from "@/queries/queries";
import { useMutation, useSubscription } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";
import { z } from "zod";
import { columns } from "./columns";

function Menu() {
   const { toast } = useToast();
   const [dialogOpen, setDialogOpen] = useState(false);

   const { data: foodData, loading: foodLoading } = useSubscription(GET_FOODS);
   const { data: categoriesData, loading: categoriesLoading } = useSubscription(GET_ALL_CATEGORIES);
   const [addFood, { loading: addFoodLoading }] = useMutation(ADD_FOOD, {
      onCompleted: () => {
         toast({
            title: "Yemek başarıyla eklendi",
         });
         setDialogOpen(false);
      },
      onError: (error) => {
         toast({
            title: "Yemek eklenirken bir hata oluştu",
            description: error.message,
            variant: "destructive",
         });
      },
   });

   const formSchema = z.object({
      foodName: z.string({ required_error: "Yemek ismi zorunludur" }).min(3, { message: "Yemek ismi en az 3 karakterden oluşmalıdır" }),
      foodImage: z.string({ required_error: "Yemek resmi zorunludur" }).startsWith("https://", { message: "Resim adresi 'https://' ile başlamadır" }),
      foodDescription: z
         .string({ required_error: "Yemek açıklaması zorunludur" })
         .min(50, { message: "Yemek açıklaması en az 50 karakter olmalıdır" })
         .max(300, { message: "Yemek açıklaması 300 karakterden fazla olamaz" }),
      foodPrice: z.number({ required_error: "Yemek fiyatı zorunludur" }).gte(0, { message: "Yemek fiyatı 0 olamaz" }),
      categoryId: z.string({ required_error: "Yemek kategorisi zorunludur" }).min(1, { message: "Yemek kategorisi zorunludur" }),
   });

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         foodName: "",
         foodImage: "",
         foodDescription: "",
         foodPrice: 0,
         categoryId: "",
      },
   });

   const handleAddFood = async (values: z.infer<typeof formSchema>) => {
      const id = nanoid();
      await addFood({
         variables: { id, food_name: values.foodName, food_image: values.foodImage, food_description: values.foodDescription, food_price: values.foodPrice, category_id: values.categoryId },
      });
   };

   if (foodLoading)
      return (
         <div className="h-96">
            <Loading />
         </div>
      );

   return (
      <div>
         <div className="flex w-full p-3 justify-end">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
               <DialogTrigger asChild>
                  <Button variant={"outline"}>Yemek ekle</Button>
               </DialogTrigger>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Yemek ekle</DialogTitle>
                     <DialogDescription>Yemek eklemek için gerekli bilgileri doldurunuz</DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(handleAddFood)} className="space-y-3">
                        <FormField
                           control={form.control}
                           name="foodName"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input placeholder="Yemek adı" onChange={field.onChange} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="foodImage"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input placeholder="Yemek resmi" onChange={field.onChange} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="foodPrice"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input
                                       className="[&::-webkit-inner-spin-button]:appearance-none"
                                       type="number"
                                       placeholder="Yemek fiyatı"
                                       onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="foodDescription"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Textarea placeholder="Yemek açıklaması" onChange={field.onChange} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="categoryId"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Select onValueChange={field.onChange}>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Bir kategori seçiniz" />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectGroup>
                                             {categoriesData &&
                                                categoriesData.categories.map((category: Categories) => (
                                                   <SelectItem key={category.id} value={category.id}>
                                                      {category.category_name}
                                                   </SelectItem>
                                                ))}
                                          </SelectGroup>
                                       </SelectContent>
                                    </Select>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <div className="w-full flex justify-end">
                           <Button variant={"outline"} type="submit">
                              {addFoodLoading ? <PiSpinner className="animate-spin w-6 h-6" /> : "Ekle"}
                           </Button>
                        </div>
                     </form>
                  </Form>
               </DialogContent>
            </Dialog>
         </div>
         <div className="w-full table-overflow">
            <DataTable columns={columns} data={foodData.foods} />
         </div>
      </div>
   );
}

export default Menu;
