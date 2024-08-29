"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllUsers, addClerkUser } from "@/lib/clerkFunctions";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PiSpinner } from "react-icons/pi";
import { useToast } from "@/components/ui/use-toast";

function Users() {
   const [users, setUsers] = useState<User[]>([]);
   const [dialogOpen, setDialogOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const { toast } = useToast();

   const formSchema = z.object({
      username: z.string({ required_error: "Lütfen kullanıcı adı giriniz" }).min(3, { message: "Kullanıcı adı en az 3 karakter olmalı" }),
      password: z.string({ required_error: "Lütfen kullanıcı şifresi giriniz" }).min(8, { message: "Şifre en az 8 karakter olmalıdır" }),
      role: z.string({ required_error: "Lütfen bir rol seçiniz" }).min(1, { message: "Lütfen bir rol seçiniz" }),
   });

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         username: "",
         password: "",
         role: "",
      },
   });

   useEffect(() => {
      const getUsers = async () => {
         const data: User[] = await getAllUsers();
         setUsers(data);
      };
      getUsers();
   }, []);

   useEffect(() => {
      if (!dialogOpen) form.reset();
   }, [dialogOpen, form]);

   const handleAddUser = async (values: z.infer<typeof formSchema>) => {
      setLoading(true);
      try {
         const res = await addClerkUser(values);
         if (res.success) {
            toast({
               title: "Kullanıcı başarıyla eklendi",
            });
         } else {
            toast({
               title: "Kullanıcı eklenirken bir hata oluştu",
               description: res.message,
               variant: "destructive",
            });
         }
         setDialogOpen(false);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };

   return (
      <div>
         <div className="flex w-full p-1 justify-end">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
               <DialogTrigger asChild>
                  <Button variant={"outline"}>Kullanıcı Ekle</Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                     <DialogTitle>Kullanıcı ekle</DialogTitle>
                     <DialogDescription>Kullanıcı eklemek için bilgileri doldurunuz</DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                     <form className="space-y-4" onSubmit={form.handleSubmit(handleAddUser)}>
                        <FormField
                           control={form.control}
                           name="username"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input placeholder="Kullanıcı adı" onChange={field.onChange} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input placeholder="Şifre" onChange={field.onChange} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="role"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Select onValueChange={field.onChange}>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Rol seçiniz." />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectGroup>
                                             <SelectItem value="admin">Yönetici</SelectItem>
                                             <SelectItem value="kitchen">Mutfak</SelectItem>
                                             <SelectItem value="waiter">Garson</SelectItem>
                                          </SelectGroup>
                                       </SelectContent>
                                    </Select>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <DialogFooter>
                           <Button size={loading ? "icon" : "default"} variant={"outline"} type="submit">
                              {loading ? <PiSpinner className="animate-spin w-6 h-6" /> : "Ekle"}
                           </Button>
                        </DialogFooter>
                     </form>
                  </Form>
               </DialogContent>
            </Dialog>
         </div>
      </div>
   );
}

export default Users;
