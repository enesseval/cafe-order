"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function Login() {
   const formSchema = z.object({
      username: z.string({ required_error: "Kullanıcı adı zorunludur" }).min(1, { message: "Kullanıcı adı zorunludur" }),
      password: z.string({ required_error: "Şifre zorunludur" }).min(1, { message: "Şifre zorunludur" }),
   });

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
   });

   const handleSubmit = (values: z.infer<typeof formSchema>) => {
      console.log(values);
   };

   return (
      <div className="bg-gradient-to-l from-gray-100 to-gray-400 dark:from-gray-900 dark:to-gray-700">
         <nav className="w-full flex justify-end bg-transparent p-4 absolute">
            <ThemeSwitcher />
         </nav>
         <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm p-4 bg-transparent/10 dark:bg-transparent/50 border-none ">
               <CardHeader>
                  <CardTitle className="text-center text-2xl font-semibold">GİRİŞ YAP</CardTitle>
               </CardHeader>
               <CardContent>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                           control={form.control}
                           name="username"
                           render={({ field }) => (
                              <FormItem>
                                 <FormControl>
                                    <Input type="text" placeholder="Kullanıcı adı" className="w-full px-3 py-2 border-black dark:border-muted" onChange={field.onChange} />
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
                                    <Input type="password" placeholder="Şifre" className="w-full px-3 py-2 border-black dark:border-muted" onChange={field.onChange} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <div className="flex justify-center">
                           <Button type="submit" variant={"outline"} className="rounded-lg py-2">
                              Giriş Yap
                           </Button>
                        </div>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}

export default Login;
