import React from "react";

function PerformanceCard() {
   const today = new Date("2024-09-01");
   // const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
   // const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
   // const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

   // // Haftalık tarih aralıkları
   // const startOfCurrentWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)).toISOString().split("T")[0];
   // const endOfCurrentWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)).toISOString().split("T")[0];
   // const startOfLastWeek = new Date(today.setDate(today.getDate() - today.getDay() - 6)).toISOString().split("T")[0];
   // const endOfLastWeek = new Date(today.setDate(today.getDate() - today.getDay() - 1)).toISOString().split("T")[0];

   // // Aylık tarih aralıkları
   // const startOfCurrentMonth = firstDayOfCurrentMonth.toISOString().split("T")[0];
   // const endOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split("T")[0];
   // const startOfLastMonth = firstDayOfLastMonth.toISOString().split("T")[0];
   // const endOfLastMonth = lastDayOfLastMonth.toISOString().split("T")[0];
   // console.log("startOfCurrentWeek", startOfCurrentWeek);
   // console.log("endOfCurrentWeek", endOfCurrentWeek);
   // console.log("startOfLastWeek", startOfLastWeek);
   // console.log("endOfLastWeek", endOfLastWeek);
   // console.log("endOfCurrentMonth", endOfCurrentMonth);
   // console.log("startOfCurrentMonth", startOfCurrentMonth);
   // console.log("startOfLastMonth", startOfLastMonth);
   // console.log("endOfLastMonth", endOfLastMonth);

   return <div>PerformanceCard</div>;
}

export default PerformanceCard;
