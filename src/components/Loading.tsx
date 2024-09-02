import React from "react";
import { HashLoader } from "react-spinners";

function Loading() {
   return (
      <div className="w-full h-full flex items-center justify-center">
         <HashLoader size={150} speedMultiplier={0.9} color="#332189" />
      </div>
   );
}

export default Loading;
