type User = {
   id?: string;
   username: string | null; // `string | null` olarak güncellendi
   password?: string;
   role: unknown | string; // Burada role için uygun bir tür belirtmeniz önerilir
};

type addUserResult = {
   success: boolean;
   message?: string;
};
