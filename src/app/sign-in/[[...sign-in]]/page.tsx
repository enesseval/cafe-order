import React from "react";
import { SignIn } from "@clerk/nextjs";

function Auth() {
   return (
      <div className="w-full min-h-screen flex items-center justify-center">
         <SignIn />
      </div>
   );
}

export default Auth;
