"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import type { Categories, Foods } from "@/gql/graphql";
import { ADD_FOOD, DELETE_FOOD, GET_ALL_CATEGORIES, GET_FOODS } from "@/queries/queries";
import { useMutation, useSubscription } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { PiSpinner } from "react-icons/pi";
import { z } from "zod";

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
   const [deleteFood] = useMutation(DELETE_FOOD, {
      onCompleted: () => {
         toast({
            title: "Yemek başarıyla silindi",
         });
         setDialogOpen(false);
      },
      onError: (error) => {
         toast({
            title: "Yemek silinirken bir hata oluştu",
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

   const handleDeleteFood = async (id: string) => {
      deleteFood({ variables: { id } });
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
         <div className="w-full">
            <Table className="w-10/12 mx-auto">
               <TableHeader>
                  <TableRow>
                     <TableHead>Yemek adı</TableHead>
                     <TableHead>Yemek açıklaması</TableHead>
                     <TableHead>Yemek resmi</TableHead>
                     <TableHead>Yemek fiyatı</TableHead>
                     <TableHead>Yemek kategorisi</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {foodData &&
                     foodData.foods.map((food: Foods) => (
                        <TableRow key={food.id}>
                           <TableCell>{food.food_name}</TableCell>
                           <TableCell>
                              <div className="relative group inline-block">
                                 <span>{food.food_description.length > 30 ? food.food_description.slice(0, 30) + "..." : food.food_description}</span>
                                 {food.food_description.length > 30 && (
                                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-64 bg-background text-left border border-gray-300 p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                       {food.food_description}
                                    </div>
                                 )}
                              </div>
                           </TableCell>
                           <TableCell>
                              <div className="relative group inline-block">
                                 <span>{food.food_image.slice(0, 20) + "..."}</span>
                                 <div
                                    style={{ backgroundImage: `url(${food.food_image})` }}
                                    className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-64 aspect-square bg-center bg-cover bg-no-repeat bg-background text-left border border-gray-300 p-3 rounded-lg shadow-lg hidden group-hover:block transition-all duration-300 z-10"
                                 ></div>
                              </div>
                           </TableCell>
                           <TableCell>{food.food_price}</TableCell>
                           <TableCell>{food.category.category_name}</TableCell>
                           <TableCell className="flex items-center">
                              <Button onClick={() => handleDeleteFood(food.id)} size={"icon"} variant={"destructive"}>
                                 <IoClose className="w-6 h-6" />
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

export default Menu;
