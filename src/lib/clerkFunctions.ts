"use server";

import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function getAllUsers() {
   const { data } = await clerkClient.users.getUserList();

   return data.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.publicMetadata.role,
   }));
}

export async function addClerkUser(values: User): Promise<addUserResult> {
   try {
      await clerkClient.users.createUser({
         username: values.username || "",
         password: values.password,
         unsafeMetadata: {
            role: values.role,
         },
      });

      return { success: true };
   } catch (error: any) {
      return { success: false, message: error.message };
   }
}
