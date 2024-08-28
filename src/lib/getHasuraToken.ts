"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

export async function getHasuraToken(): Promise<string> {
   const { getToken } = auth();
   const user = await currentUser();

   if (!user) throw new Error("Kullanıcı doğrulanamadı");

   const token = await getToken({ template: "hasura" });

   if (!token) {
      throw new Error("Token alınamadı");
   }

   return `Bearer ${token}`;
}
