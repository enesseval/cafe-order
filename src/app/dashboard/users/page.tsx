"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { PiSpinner } from "react-icons/pi";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getAllUsers, addClerkUser, deleteClerkUser } from "@/lib/clerkFunctions";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function Users() {
   const { toast } = useToast();
   const [users, setUsers] = useState<User[]>([]);
   const [dialogOpen, setDialogOpen] = useState(false);
   const [addUserLoading, setAddUserLoading] = useState(false);

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

   const fetchUsers = async () => {
      const data: User[] = await getAllUsers();
      setUsers(data);
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   useEffect(() => {
      if (!dialogOpen) form.reset();
   }, [dialogOpen, form]);

   const handleAddUser = async (values: z.infer<typeof formSchema>) => {
      setAddUserLoading(true);
      try {
         const res = await addClerkUser(values);
         if (res.success) {
            toast({
               title: "Kullanıcı başarıyla eklendi",
            });
            await fetchUsers();
         } else {
            toast({
               title: "Kullanıcı eklenirken bir hata oluştu",
               description: res.message,
               variant: "destructive",
            });
         }
         setDialogOpen(false);
         setAddUserLoading(false);
      } catch (error) {
         console.log(error);
         setAddUserLoading(false);
      }
   };

   const handleDeleteUser = async (user_id: string) => {
      if (user_id !== "") {
         try {
            const res = await deleteClerkUser(user_id);
            if (res.success) {
               toast({
                  title: "Kullanıcı başarıyla silindi",
               });
               await fetchUsers();
            } else {
               toast({
                  title: "Kullanıcı silinirken bir hata oluştu",
                  description: res.message,
                  variant: "destructive",
               });
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   if (users.length === 0) return <Loading />;

   return (
      <div>
         <div className="flex w-full p-3 justify-end">
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
                                    <Input placeholder="Şifre" type="password" onChange={field.onChange} />
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
                           <Button size={addUserLoading ? "icon" : "default"} variant={"outline"} type="submit">
                              {addUserLoading ? <PiSpinner className="animate-spin w-6 h-6" /> : "Ekle"}
                           </Button>
                        </DialogFooter>
                     </form>
                  </Form>
               </DialogContent>
            </Dialog>
         </div>
         <div className="p-2 w-10/12 mx-auto">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Kullanıcı adı</TableHead>
                     <TableHead>Kullanıcı rolü</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {users.map((user) => {
                     if (user.role !== "table") {
                        return (
                           <TableRow key={user.id}>
                              <TableCell>{user.username}</TableCell>
                              <TableCell>{user.role}</TableCell>
                              <TableCell>
                                 <Button onClick={() => handleDeleteUser(user.id || "")} size={"icon"} variant={"destructive"}>
                                    <IoClose />
                                 </Button>
                              </TableCell>
                           </TableRow>
                        );
                     }
                  })}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}

export default Users;
