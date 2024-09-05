export const isValidCardDate = (date: string) => {
   const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // AA/YY formatı
   if (!regex.test(date)) return false;

   const [expMonth, expYear] = date.split("/").map(Number);
   const currentDate = new Date();
   const currentMonth = currentDate.getMonth() + 1; // 0-indexli olduğu için +1
   const currentYear = currentDate.getFullYear() % 100; // Yılın son iki basamağı

   // Tarih geçmişse false döner
   if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return false;
   }

   return true;
};

export const formatCardNumber = (value: string) => {
   const cleaned = value.replace(/\D/g, "");
   return cleaned.replace(/(.{4})/g, "$1 ").trim();
};

export const formatExpiryDate = (value: string) => {
   const cleaned = value.replace(/\D/g, ""); // Sadece sayıları al
   if (cleaned.length <= 2) {
      return cleaned; // İlk iki rakam (ay)
   }
   return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4); // AA/YY formatı
};
