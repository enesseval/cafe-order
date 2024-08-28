"use server";

import { createClerkClient } from "@clerk/backend";

export async function deneme() {
   const clerkClient = createClerkClient({ secretKey: "sk_test_7J9TOtUKCbTVzxukEjAIElbJy6k2JH1f87jfyZA1nS" });

   const { data } = await clerkClient.users.getUserList();

   return data.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.publicMetadata.role,
   }));
}
