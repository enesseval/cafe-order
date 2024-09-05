"use server";

import { clerKFunctionsResult, User } from "@/types/types";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function getAllUsers() {
   const { data } = await clerkClient.users.getUserList({ limit: 100 });

   return data.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.publicMetadata.role as string,
   }));
}

export async function addClerkUser(values: User): Promise<clerKFunctionsResult> {
   try {
      await clerkClient.users.createUser({
         username: values.username || "",
         password: values.password,
         publicMetadata: {
            role: values.role,
         },
      });

      return { success: true };
   } catch (error: any) {
      return { success: false, message: error.message };
   }
}

export async function deleteClerkUser(user_id: string): Promise<clerKFunctionsResult> {
   try {
      await clerkClient.users.deleteUser(user_id);
      return { success: true };
   } catch (error: any) {
      return { success: false, message: error.message };
   }
}
