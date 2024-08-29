import React from "react";
import { SignIn } from "@clerk/nextjs";

function Auth() {
   return (
      <div>
         <SignIn />
      </div>
   );
}

export default Auth;
