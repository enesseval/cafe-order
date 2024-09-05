"use client";

import { useShopbag } from "@/components/context/ShopbagContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { z } from "zod";
import isCreditCard from "validator/lib/isCreditCard";
import { formatCardNumber, formatExpiryDate, isValidCardDate } from "../../lib/cardValidateFunctions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FaSpinner } from "react-icons/fa6";
import { useRouter } from "next/navigation";

function Payment() {
   const { toast } = useToast();
   const [loading, setLoading] = useState(false);
   const { items, addItem, removeItem, totalPrice } = useShopbag();

   const formSchema = z.object({
      fullname: z.string({ required_error: "Kart üzerindeki ismi giriniz" }).min(1, { message: "Kart üzerindeki isim zorunludur" }),
      cardNumber: z.string({ required_error: "Kart numarasını giriniz" }).refine(isCreditCard, { message: "Lütfen geçerli bir kart numarası giriniz" }),
      lastDate: z.string({ required_error: "Kart son kullanma tarihini giriniz" }).refine(isValidCardDate, { message: "Lütfen geçerli bir tarih giriniz" }),
      securityCode: z.string({ required_error: "Kartın arka yüzündeki güvenlik kodunu giriniz" }).min(0, { message: "Lütfen geçerli bir kod giriniz" }),
   });

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         fullname: "",
         cardNumber: "",
         lastDate: "",
         securityCode: "",
      },
   });

   const handleSubmit = async (values: z.infer<typeof formSchema>) => {
      setLoading(true);
      const [expireMonth, expireYear] = values.lastDate.split("/");

      const basketItems = items.flatMap((item) => {
         return Array(item.quantity).fill({
            id: item.id,
            name: item.name,
            category1: item.category,
            category2: item.category,
            itemType: "PHYSICAL",
            price: item.price,
         });
      });

      const data = {
         price: totalPrice,
         basketId: nanoid(),
         paymentCard: {
            cardHolderName: values.fullname,
            cardNumber: values.cardNumber.replace(/\s+/g, ""),
            expireMonth,
            expireYear: `20${expireYear}`,
            cvc: values.securityCode,
            registerCard: "0",
         },
         basketItems,
      };

      handlePayment(data);
      // fetch("http://localhost:3001/api/payment", {
      //    method: "POST",
      //    headers: {
      //       "Content-Type": "application/json",
      //    },
      //    body: JSON.stringify(data),
      // })
      //    .then((res) => res.json())
      //    .then((data) => {
      //       console.log(data);
      //       setLoading(false);
      //       toast({
      //          title:"Ödeme başarıyla alındı"
      //       })
      //    })
      //    .catch((e) => {
      //       console.log("Error: ", e);
      //       setLoading(false);
      //    });
   };

   const handlePayment = async (data: any) => {
      try {
         const response = await fetch("http://localhost:3001/api/payment", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         if (response.ok) {
            toast({
               title: "Ödeme başarılı",
            });
         } else {
            toast({
               title: "Bir hata oluştu",
               description: response.statusText,
               variant: "destructive",
            });
         }
      } catch (error) {
         toast({
            title: "Bir hata oluştu",
            description: `${(error as Error).message} || "Bilinmeyen hata"}`,
            variant: "destructive",
         });
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         <Navbar />
         <div className="grid gap-1 grid-cols-1 lg:grid-cols-2 w-11/12 max-w-[1100px] my-5 mx-auto">
            <div>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Yemek adı</TableHead>
                        <TableHead>Yemek fiyatı</TableHead>
                        <TableHead className="text-center">Yemek adedi</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {items.map((item) => (
                        <TableRow key={item.id}>
                           <TableCell>
                              <div className="w-20 h-20 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.image})` }}></div>
                           </TableCell>
                           <TableCell>{item.name}</TableCell>
                           <TableCell>{item.price}</TableCell>
                           <TableCell className="flex items-center justify-center min-h-[97px]">
                              <div className="grid grid-cols-3 items-center">
                                 <div className="col-span-1">
                                    <Button onClick={() => removeItem(item.id)} size={"icon"} variant={"ghost"}>
                                       <FaMinus />
                                    </Button>
                                 </div>
                                 <div className="flex items-center justify-center border-x border-black dark:border-white col-span-1">
                                    <p className="text-center">{item.quantity}</p>
                                 </div>
                                 <div className="col-span-1">
                                    <Button
                                       onClick={() => addItem({ id: item.id, name: item.name, category: item.category, image: item.image, price: item.price, quantity: 1 })}
                                       size={"icon"}
                                       variant={"ghost"}
                                    >
                                       <FaPlus />
                                    </Button>
                                 </div>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
                  <TableFooter>
                     <TableRow>
                        <TableCell colSpan={4}>Toplam</TableCell>
                        <TableCell className="text-right">{totalPrice} ₺</TableCell>
                     </TableRow>
                  </TableFooter>
               </Table>
            </div>
            <div>
               <div className="my-5 border rounded-lg p-3">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                        <FormField
                           control={form.control}
                           name="fullname"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input onChange={field.onChange} placeholder="Kart sahibi adı" />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="cardNumber"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input
                                       placeholder="0000 0000 0000 0000"
                                       {...field}
                                       onChange={(e) => {
                                          const formattedValue = formatCardNumber(e.target.value);
                                          field.onChange(formattedValue);
                                       }}
                                       maxLength={19}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <div className="grid gap-2 grid-cols-2">
                           <div className="col-span-1">
                              <FormField
                                 control={form.control}
                                 name="lastDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             placeholder="AA/YY"
                                             {...field}
                                             onChange={(e) => {
                                                const formattedValue = formatExpiryDate(e.target.value);
                                                field.onChange(formattedValue);
                                             }}
                                             maxLength={5}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="col-span-1">
                              <FormField
                                 control={form.control}
                                 name="securityCode"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             placeholder="000"
                                             type="text" // text tipi kullanılır
                                             {...field}
                                             onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, ""); // Sadece sayıları al
                                                if (value.length <= 3) {
                                                   field.onChange(value); // Değer 3 haneli veya daha kısa ise güncellenir
                                                }
                                             }}
                                             value={field.value} // Form değerini alır
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                        <div className="w-full flex justify-center">
                           <Button className="w-1/2" variant={"outline"} type="submit">
                              {loading ? <FaSpinner className="w-6 h-6 animate-spin" /> : "ÖDE"}
                           </Button>
                        </div>
                     </form>
                  </Form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Payment;
